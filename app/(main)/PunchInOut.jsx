import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';

export default function PunchInOut() {
    const getStartOfWeek = (date) => {
        const current = new Date(date);
        const day = current.getDay();
        const diff = current.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(current.setDate(diff));
    };

    const [selectedDate, setSelectedDate] = useState(new Date());

    const today = new Date();
    const startOfWeek = getStartOfWeek(today);

    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        return {
            day: date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: date.getDate(),
            fullDate: date,
        };
    });
    const lastFiveDays = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i); // Subtract days for each index
        return date;
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.textContainer}>
                    <Text style={styles.profileName}>Charlotte Smith</Text>
                    <Text style={styles.profileRole}>Teacher</Text>
                </View>
                <MaterialIcons name="notifications-none" size={24} color="black" />
            </View>


            <View style={styles.dateContainer}>
                <Text style={styles.dateText}>{today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
                <View style={styles.dateRow}>
                    {weekDates.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedDate(item.fullDate)}
                            style={[
                                styles.dateBox,
                                item.date === selectedDate.getDate() ? styles.selectedDate : null,
                            ]}>
                            <Text style={styles.dayText}>{item.day}</Text>
                            <Text style={styles.dateNumber}>{item.date}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.webPunchContainer}>
                <TouchableOpacity style={[styles.punchButton, styles.punchIn]}>
                    <SimpleLineIcons name="login" size={20} color="#fff" />
                    <Text style={styles.punchButtonText}>Punch In</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.punchButton, styles.punchOut]}>
                    <SimpleLineIcons name="logout" size={20} color="#fff" />
                    <Text style={styles.punchButtonText}>Punch Out</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.attendanceContainer}>
                <Text style={styles.sectionTitle}>Today Attendance</Text>
                <View style={styles.attendanceRow}>
                    <View style={styles.attendanceBox}>
                        <View style={{ flexDirection: 'row', alignItems: 'left' }}>
                            <SimpleLineIcons name="login" size={20} color="blue" backgroundColor='skyblue' padding='4' borderRadius='roun' />
                            <Text style={[styles.attendanceTime, { marginLeft: 5 }]}>Check In</Text>
                        </View>
                        <Text style={styles.attendanceLabel}>10:00 am</Text>
                        <Text style={styles.attendanceStatus}>On Time</Text>
                    </View>
                    <View style={styles.attendanceBox}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <SimpleLineIcons name="logout" size={20} color="blue" backgroundColor='skyblue' padding='4' />
                            <Text style={[styles.attendanceTime, { marginLeft: 5 }]}>Check Out</Text>
                        </View>
                        <Text style={styles.attendanceLabel} paddingRight='10'>07:00 pm</Text>
                        <Text style={styles.attendanceStatus} paddingRight='10'>Go Home</Text>
                    </View>
                </View>

            </View>


            <View style={styles.Text}>
                <Text style={styles.sectionTitle}>Your Activity</Text>
                <Text style={styles.viewAll} onPress={() => { router.push('(main)/ActivityHistory') }}>View all</Text>
            </View>

            <View style={styles.activityContainer}>
                {lastFiveDays.map((activityDate, index) => (
                    <View key={index} style={styles.activityCard}>
                        <SimpleLineIcons
                            name={index % 2 === 0 ? "login" : "logout"}
                            size={20}
                            color="black"
                        />
                        <View style={styles.cardDetails}>
                            <Text style={styles.activityTime}>
                                {index % 2 === 0 ? "10:00 am" : "07:00 pm"}
                            </Text>
                            <Text style={styles.activityDate}>
                                {activityDate.toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </Text>
                            <Text style={styles.activityStatus}>On Time</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 30,
        paddingRight: 20
    },
    textContainer: {
        flexDirection: 'column',
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileRole: {
        fontSize: 14,
        color: 'gray',
    },
    dateContainer: {
        // backgroundColor: '#fff',
        // padding: 15,
        margin: 10,
        borderRadius: 10,
    },
    dateText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    dateRow: {
        // backgroundColor: 'red',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
        gap:8
    },

    dateBox: {
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 45, 
        height: 55,
        
    },



    selectedDate: {
        backgroundColor: 'orange',
        borderRadius: 10,
    },
    dayText: {
        fontSize: 12,
        color: '#666',
    },
    dateNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    webPunchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
    },
    punchButton: {
        flex: 1,
        padding: 15,
        borderRadius: 25,
        margin: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    punchIn: {
        backgroundColor: '#4caf50',
    },
    punchOut: {
        backgroundColor: '#f44336',
    },
    punchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    attendanceContainer: {
        backgroundColor: '#fff',
        margin: 10,
        padding: 15,
        borderRadius: 10,
    },
    Text: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingTop: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewAll: {
        fontSize: 16,
        color: 'blue',
    },
    attendanceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    attendanceBox: {
        alignItems: 'center',
        flex: 1,
        margin: 5,
        padding: 15,
        paddingLeft: 0,
        backgroundColor: '#e3f2fd',
        borderRadius: 10,
    },
    attendanceTime: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    attendanceLabel: {
        fontSize: 14,
        color: '#888',
        right: 20
    },
    attendanceStatus: {
        fontSize: 12,
        color: '#4caf50',
        right: 25
    },
    activityContainer: {
        backgroundColor: '#fff',
        margin: 10,
        padding: 15,
        borderRadius: 10,
    },
    activityCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardDetails: {
        marginLeft: 10,
    },
    activityTime: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    activityDate: {
        fontSize: 12,
        color: '#888',
    },
    activityStatus: {
        fontSize: 12,
        color: '#4caf50',
        fontWeight: 'bold',
    },
});
