import React, { createContext, useState, useEffect } from "react";
import { register, login as apiLogin } from "./Api";
import { getActiveStudents, getGrades, getStudents } from "./teachers_api";
import CryptoJS from "react-native-crypto-js";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyContext = createContext();

const ContextProvider = ({ children }) => {
    const SECRET_KEY = "12948283598263949891234";
    const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
    const [existingUser, setExistingUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentArr, setStudentArr] = useState([]);
    const [studentActive, setStudentActive] = useState([]);
    const [grade, setGrade] = useState([]);

    // Helper: Encrypt data
    const encryptData = (data) => {
        return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    };

    // Helper: Decrypt data
    const decryptData = (encryptedData) => {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            console.error("Decryption failed:", error);
            return null;
        }
    };

    // Helper: Check if cache is valid (within CACHE_DURATION)
    const isCacheValid = (timestamp) => {
        return new Date().getTime() - timestamp < CACHE_DURATION;
    };

    // Helper: Store encrypted data and timestamp in AsyncStorage
    const storeEncryptedDataWithTimestamp = async (key, data) => {
        const encryptedData = encryptData(data);
        const timestamp = new Date().getTime();
        await AsyncStorage.setItem(key, JSON.stringify({ data: encryptedData, timestamp }));
    };

    // Helper: Retrieve and decrypt data from AsyncStorage
    const retrieveDecryptedData = async (key) => {
        const item = await AsyncStorage.getItem(key);
        if (item) {
            const { data, timestamp } = JSON.parse(item);
            if (isCacheValid(timestamp)) {
                return decryptData(data);
            } else {
                await AsyncStorage.removeItem(key); // Cache expired
            }
        }
        return null;
    };

    // Load user data from AsyncStorage on mount
    useEffect(() => {
        const loadUserData = async () => {
            const userData = await retrieveDecryptedData("userData");
            if (userData) {
                setExistingUser(userData);
                setIsLoggedIn(true);
            }
        };
        loadUserData();
    }, []);

    // Fetch data (Grades, Students, Active Students)
    const fetchData = async () => {
        try {
            // Grades
            let grades = await retrieveDecryptedData("grades");
            if (!grades) {
                grades = await getGrades();
                storeEncryptedDataWithTimestamp("grades", grades);
            }
            setGrade(grades.map((g) => g.id));

            // Students
            let students = await retrieveDecryptedData("students");
            if (!students) {
                students = await getStudents(existingUser.username);
                storeEncryptedDataWithTimestamp("students", students);
            }
            setStudentArr(students);

            // Active Students
            let activeStudents = await retrieveDecryptedData("activeStudents");
            if (!activeStudents) {
                const gradeIds = grades.map((g) => g.id);
                activeStudents = await getActiveStudents(existingUser.username, gradeIds);
                storeEncryptedDataWithTimestamp("activeStudents", activeStudents);
            }
            setStudentActive(activeStudents);

        } catch (error) {
            console.error("Error fetching data:", error.message || error);
        }
    };

    // Fetch data when logged in
    useEffect(() => {
        if (isLoggedIn) {
            fetchData();
        }
    }, [isLoggedIn]);

    // Handle user login
    const handleLogin = async (credentials) => {
        try {
            const user = await apiLogin(credentials);
            storeEncryptedDataWithTimestamp("userData", user);
            setExistingUser(user);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Login failed:", error.message || error);
            throw error;
        }
    };

    // Handle user logout
    const handleLogout = async () => {
        await AsyncStorage.removeItem("userData");
        await AsyncStorage.removeItem("grades");
        await AsyncStorage.removeItem("students");
        await AsyncStorage.removeItem("activeStudents");
        setExistingUser(null);
        setIsLoggedIn(false);
    };

    const contextValue = {
        existingUser,
        setExistingUser,
        isLoggedIn,
        login: handleLogin,
        logout: handleLogout,
        register,
        studentArr,
        studentActive,
        grade,
    };

    return <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>;
};

export { MyContext, ContextProvider };
