import axios from "axios";

const API_URL = "https://aiala.troshi.in/api";

// Registration API
export const register = async (userDetails, setExistingUser) => {
    try {
        console.log(userDetails);
        const response = await axios.post(`${API_URL}/users/register`, userDetails);
        setExistingUser(response.data);
        return response.data
    } catch (error) {
        console.error("Registration failed:", error);
        throw error;
    }
};

// Login API

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, credentials);
        return response.data; 
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message || error);
        throw error;
    }
};


export const pendingUserDetails = async (userDetails, setExistingUser) => {
    try {
        // Make the API request
        const response = await axios.post(`${API_URL}/questionnaire/update-user-details`, userDetails);
        if (setExistingUser) {
            setExistingUser(response.data);
        }
        return response.data;
    } catch (error) {
        // Handle error gracefully
        console.error("Login failed:", error?.response?.data || error.message);
        throw error?.response?.data || error;
    }
};


