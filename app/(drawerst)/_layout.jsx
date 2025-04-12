import React, { useContext, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MyContext } from "../../components/provider/contextApi";
import { router } from "expo-router";
import { AntDesign, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

export default function Layout() {
    const { existingUser } = useContext(MyContext);

    const userRole = existingUser && existingUser?.usertype;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                drawerContent={(props) => <CustomDrawerContent {...props} userRole={userRole} />}
                screenOptions={{ headerShown: false }}
            />
        </GestureHandlerRootView>
    );
}

const CustomDrawerContent = ({ userRole, ...props }) => {
    const [isAssessmentDropdownOpen, setAssessmentDropdownOpen] = useState(false);
    const [isCoursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
    const { existingUser, logout } = useContext(MyContext);

    const handleOptionPress = (path) => {
        router.push(path);
    };

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.logo}
                    />

                </View>
                {/* Profile Section */}
                <View style={styles.profileContainer}>
                    <Image
                        source={{
                            uri: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
                        }}
                        style={styles.profilePicture}
                    />
                    <View>
                        <Text style={styles.profileName}>{existingUser && existingUser?.userData.firstname} {existingUser && existingUser?.userData.lastname}</Text>
                        <Text style={styles.profileEmail}>{existingUser && existingUser?.userData.email}</Text>
                        <Text style={styles.profileRole}>{existingUser && existingUser?.usertype}</Text>
                    </View>
                </View>

                {/* Navigation Items */}
                <DrawerItem
                    icon={({ size }) => <Icon name="home-outline" size={size} color="#234782" />}
                    label="Home"
                    onPress={() => router.push("/(drawerst)/(tabsstt)")}
                />
                <DrawerItem
                    icon={({ size }) => (
                        <MaterialCommunityIcons name="clipboard-check-outline" size={size} color="#234782" />
                    )}
                    label="Assessment"
                    onPress={() => setAssessmentDropdownOpen(!isAssessmentDropdownOpen)}
                />
                {isAssessmentDropdownOpen && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleOptionPress("/(mainST)/MockTest")}
                        >
                            <Text style={styles.optionText}>Mock Test</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleOptionPress("/(mainST)/Assessments")}
                        >
                            <Text style={styles.optionText}>Assessments</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleOptionPress("/(mainST)/Report")}
                        >
                            <Text style={styles.optionText}>Report</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <DrawerItem
                    icon={({ size }) => <FontAwesome5 name="book-reader" size={size} color="#234782" />}
                    label="Study Buddy"
                    onPress={() => handleOptionPress("/(tabsstt)/studybuddy")}
                />
                <DrawerItem
                    icon={({ size }) => (
                        <MaterialCommunityIcons name="pencil-box-multiple" size={size} color="#234782" />
                    )}
                    label="Learn Mate"
                    onPress={() => handleOptionPress("/(mainST)/LearnMate")}
                />
                <DrawerItem
                    icon={({ size }) => <FontAwesome6 name="graduation-cap" size={size} color="#234782" />}
                    label="Courses"
                    onPress={() => setCoursesDropdownOpen(!isCoursesDropdownOpen)}
                />
                {isCoursesDropdownOpen && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleOptionPress("/(mainST)/ViewCourse")}
                        >
                            <Text style={styles.optionText}>View Courses</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleOptionPress("/(mainST)/GenerateCourse")}
                        >
                            <Text style={styles.optionText}>Generate Courses</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <DrawerItem
                    icon={({ size }) => <AntDesign name="user" size={size} color="#234782" />}
                    label="My Account"
                    onPress={() => router.push("/(tabsstt)/myAccountSt")}
                />
            </DrawerContentScrollView>

            {/* Logout Button at the Bottom */}
            <View style={styles.logoutContainer}>
                <DrawerItem
                    icon={({ size }) => <SimpleLineIcons name="login" size={size} color="#234782" />}
                    label="Log Out"
                    onPress={logout}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    logo: {
        width: 150,
        height: 100,
        resizeMode: 'contain',
    },
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    profilePicture: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    profileName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#234782",
    },
    profileEmail: {
        fontSize: 14,
        color: "#555",
    },
    profileRole: {
        fontSize: 14,
        color: "#888",
    },
    dropdown: {
        paddingVertical: 8,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginHorizontal: 15,
        marginTop: 5,
    },
    option: {
        padding: 12,
    },
    optionText: {
        fontSize: 14,
        color: "#234782",
    },
    logoutContainer: {
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        padding: 10,
        backgroundColor: "#f9f9f9",
    },
});
