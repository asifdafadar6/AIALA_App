import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'; // Ensure the import is correct for your setup

export default function ActivityHistory() {
    const today = new Date();

    // Generate dates from today to the past
    const dates = Array.from({ length: 10 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i); // Subtract days for each index
        return date;
    });

    return (
        <ScrollView>
        <View style={styles.activityContainer}>
            {dates.map((activityDate, index) => (
                <View key={index} style={styles.activityCard}>
                    <SimpleLineIcons
                        name="calendar"
                        size={20}
                        color="black"
                    />
                    <View style={styles.cardDetails}>
                        <Text style={styles.activityDate}>
                            {activityDate.toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </Text>
                        <View style={styles.checkInOutContainer}>
                            <Text style={styles.activityTime}>
                                Check In: {index % 2 === 0 ? "10:00 am" : "11:00 am"}
                            </Text>
                            <Text style={styles.activityTime}>
                                Check Out: {index % 2 === 0 ? "07:00 pm" : "08:00 pm"}
                            </Text>
                        </View>
                        <Text style={styles.activityStatus}>On Time</Text>
                    </View>
                </View>
            ))}
        </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
        flex: 1, // Allows the card details to take remaining space
    },
    activityDate: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    checkInOutContainer: {
        marginTop: 5, // Adds space between the date and check-in/check-out times
    },
    activityTime: {
        fontSize: 12,
        color: '#333',
    },
    activityStatus: {
        fontSize: 12,
        color: '#4caf50',
        fontWeight: 'bold',
    },
});
