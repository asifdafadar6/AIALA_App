import React, { useContext, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { Image, View, Text, StyleSheet, TouchableOpacity,Animated } from "react-native";
import { MyContext } from "../../components/provider/contextApi";
import { router } from "expo-router";
import { AntDesign, FontAwesome5, FontAwesome6, Foundation, Ionicons } from "@expo/vector-icons";

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
    const { existingUser, logout } = useContext(MyContext);

    // State to track whether each dropdown is open
    const [isDropdownOpen, setDropdownOpen] = useState({
        assistant: false,
        assessment: false,
    });

    // Toggle dropdown state for each dropdown (assistant, assessment, etc.)
    const toggleDropdown = (dropdown) => {
        setDropdownOpen((prevState) => ({
            ...prevState,
            [dropdown]: !prevState[dropdown],
        }));
    };

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
                        <Text style={styles.profileName}>
                            {existingUser?.userData.firstname} {existingUser?.userData.lastname}
                        </Text>
                        <Text style={styles.profileEmail}>{existingUser?.userData.email}</Text>
                        <Text style={styles.profileRole}>{existingUser?.usertype}</Text>
                    </View>
                </View>

                {/* Navigation Items */}
                <DrawerItem
                    icon={({ size }) => <Icon name="home-outline" size={size} color="#234782" />}
                    label="Home"
                    onPress={() => router.push("/(drawer)")}
                />

                {/* Assistant Section */}
                <TouchableOpacity
                    style={styles.drawerItem} 
                    onPress={() => toggleDropdown("assistant")}>
                    <View style={styles.itemContent}>
                        {/* Icon */}
                        <Foundation name="lightbulb" size={24} color="#234782" />
                        {/* Label */}
                        <Text style={styles.label}>Assistant</Text>
                        {/* Right Icon */}
                        <Ionicons
                            name={isDropdownOpen.assistant ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="#234782"
                        />
                    </View>
                </TouchableOpacity>
                {isDropdownOpen.assistant && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleOptionPress("/(main)/LessionPlanner")}
                        >
                            <Text style={styles.optionText}>Lesson Planner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleOptionPress("/(main)/ActivityPlanner")}
                        >
                            <Text style={styles.optionText}>Activity Planner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleOptionPress("/(main)/StudyBuddy")}
                        >
                            <Text style={styles.optionText}>Study Buddy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleOptionPress("/(main)/MentorMate")}
                        >
                            <Text style={styles.optionText}>Mentor Mate</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.drawerItem} 
                    onPress={() => toggleDropdown("assessment")}>
                    <View style={styles.itemContent}>
                        {/* Icon */}
                        <MaterialCommunityIcons name="clipboard-check-outline" size={24} color="#234782" />
                        {/* Label */}
                        <Text style={styles.label}>Assessment</Text>
                        {/* Right Icon */}
                        <Ionicons
                            name={isDropdownOpen.assessment ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="#234782"
                        />
                    </View>
                </TouchableOpacity>
                {isDropdownOpen.assessment && (
                    <View style={styles.dropdown}>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleOptionPress("/(main)/ViewAssessments")}
                        >
                            <Text style={styles.optionText}>View Assessment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => handleOptionPress("/(main)/GenerateAssessments")}
                        >
                            <Text style={styles.optionText}>Generate Assessment</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <DrawerItem
                    icon={({ size }) => <AntDesign name="user" size={size} color="#234782" />}
                    label="My Account"
                    onPress={() => router.push("/(tabs)/myAccount")}
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
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#695b5a',
        marginLeft: 10,
        flex: 1, 
        fontWeight:'semibold'
    },



    logoutContainer: {
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        padding: 10,
    },
});
