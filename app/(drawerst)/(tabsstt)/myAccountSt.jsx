import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { MyContext } from '../../../components/provider/contextApi';

const { width } = Dimensions.get('window');



export default function MyAccount() {
    const { existingUser } = useContext(MyContext)

    const defaultUserData = {
        firstname: existingUser && existingUser.userData.firstname || "demo",
        lastname:existingUser && existingUser.userData.lastname || "Student",
        email:existingUser && existingUser.userData.email || "demostudent@gmail.com",
        phone:existingUser && existingUser.userData.phone || "1234567890",
        passion: "",
        profession:existingUser && existingUser.usertype || "Student",
    };

    
    const [activeTab, setActiveTab] = useState('Personal Details');

    // State to manage the form data
    const [userData, setUserData] = useState(defaultUserData);

    // Handle change for input fields
    const handleChange = (field) => (value) => {
        setUserData({
            ...userData,
            [field]: value,
        });
    };

    return (
        <View style={styles.container}>
            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'Personal Details' && styles.activeTab]}
                    onPress={() => setActiveTab('Personal Details')}>
                    <FontAwesome5
                        name="user"
                        size={20}
                        color={activeTab === 'Personal Details' ? '#051937' : '#aaa'}
                    />
                    <Text style={[styles.tabText, activeTab === 'Personal Details' && styles.activeText]}>
                        Personal Details
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'Subscription' && styles.activeTab]}
                    onPress={() => setActiveTab('Subscription')}>
                    <MaterialIcons
                        name="subscriptions"
                        size={20}
                        color={activeTab === 'Subscription' ? '#051937' : '#aaa'}
                    />
                    <Text style={[styles.tabText, activeTab === 'Subscription' && styles.activeText]}>
                        Subscription
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'Institution' && styles.activeTab]}
                    onPress={() => setActiveTab('Institution')}>
                    <FontAwesome5
                        name="university"
                        size={20}
                        color={activeTab === 'Institution' ? '#051937' : '#aaa'}
                    />
                    <Text style={[styles.tabText, activeTab === 'Institution' && styles.activeText]}>
                        Institution
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {activeTab === 'Personal Details' ? (
                    <View style={styles.personalContainer}>
                        <Text style={styles.formTitle}>Personal Details</Text>
                        <TextInput
                            style={styles.personalInput}
                            placeholder="First Name"
                            value={userData.firstname}
                            onChangeText={handleChange('firstname')}
                        />
                        <TextInput
                            style={styles.personalInput}
                            placeholder="Last Name"
                            value={userData.lastname}
                            onChangeText={handleChange('lastname')}
                        />
                        <TextInput
                            style={styles.personalInput}
                            placeholder="Email-Id"
                            keyboardType="email-address"
                            value={userData.email}
                            onChangeText={handleChange('email')}
                        />
                        <TextInput
                            style={styles.personalInput}
                            placeholder="Mobile No."
                            keyboardType="phone-pad"
                            value={userData.phone}
                            onChangeText={handleChange('phone')}
                        />
                        <TextInput
                            style={styles.personalInput}
                            placeholder="Passion"
                            value={userData.passion}
                            onChangeText={handleChange('passion')}
                        />
                        <TextInput
                            style={styles.personalInput}
                            placeholder="Profession"
                            value={userData.profession}
                            editable={false}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.changePasswordButton}>
                                <Text style={styles.buttonText}>Change Password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteAccountButton}>
                                <Text style={styles.buttonText}>Delete Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : activeTab === 'Subscription' ? (
                    <View style={styles.subscriptionContainer}>
                        <Text style={styles.formTitle}>Subscription Details</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Subscription Type"
                            value="Active" // Assuming subscription type is static
                            editable={false}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Subscription Value"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Next Renewal Date"
                            value="2025-12-31"
                        />
                        <TouchableOpacity style={styles.Details}>
                            <Text style={styles.buttonDetailsText}>Upgrade Account</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.institutionContainer}>
                        <Text style={styles.formTitle}>Institution Details</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Grade"
                            value="5th Grade" // Assuming this value is static
                            editable={false}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Institution"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="District"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="State"
                            value="State Board" // Assuming this value is static
                            editable={false}
                        />
                        <TouchableOpacity style={styles.Details}>
                            <Text style={styles.buttonDetailsText}>Update Institute Details</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },
    tabText: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 5,
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#051937',
    },
    activeText: {
        color: '#051937',
        fontWeight: 'bold',
    },
    contentContainer: {
        paddingBottom: 30, // Add some padding at the bottom for better scrolling experience
    },
    personalContainer: {
        width: '100%',
        paddingTop: 20,
    },
    subscriptionContainer: {
        width: '100%',
        paddingTop: 20,
    },
    institutionContainer: {
        width: '100%',
        paddingTop: 20,
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#051937',
        marginBottom: 20,
    },
    personalInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 15,
        height: 50
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 15,
        height: 50
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        gap: 10,
    },
    changePasswordButton: {
        backgroundColor: '#EB6A39',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    deleteAccountButton: {
        backgroundColor: '#d9534f',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    Details: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        marginTop: 15,
    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonDetailsText: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
});
