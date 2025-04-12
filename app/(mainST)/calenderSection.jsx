import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function CalendarSection() {
    const strokeWidth = 10;
    const radius = 60; // radius of the circle
    const progress = 75; // progress percentage

    const today = new Date();
    const currentMonth = today.toLocaleString('default', { month: 'long' });
    const currentYear = today.getFullYear();
    const currentDate = today.getDate();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const emptySlots = Array(firstDayOfMonth).fill(null);
    const daysArray = [...emptySlots, ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];

    return (
        <View style={styles.container}>
            {/* Calendar Section */}
            <View style={styles.calendarContainer}>
                <Text style={styles.calendarMonth}>{`${currentMonth} ${currentYear}`}</Text>
                <View style={styles.calendarGrid}>
                    {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                        <Text key={index} style={styles.calendarDay}>{day}</Text>
                    ))}
                    {daysArray.map((day, index) => (
                        <Text
                            key={index}
                            style={[
                                styles.calendarDate,
                                day === currentDate && styles.selectedDate,
                                !day && { opacity: 0 },
                            ]}
                        >
                            {day || ''}
                        </Text>
                    ))}
                </View>
            </View>

            {/* Progress Section */}
            <View style={styles.progressContainer}>
                <Text style={styles.progressTitle}>Your Progress This Month</Text>
                <View style={styles.circularProgressContainer}>
                    <View style={styles.circularBackground} />
                    <View
                        style={[
                            styles.circularForeground,
                            {
                                transform: [
                                    { rotate: `${(progress / 100) * 360}deg` },
                                ],
                            },
                        ]}
                    />
                    <View style={styles.innerCircle}>
                        <Text style={styles.progressPercentage}>{progress}%</Text>
                    </View>
                </View>
                <Text style={styles.progressLabel}>15+ Lorem Ipsum achievements</Text>
            </View>

            {/* Legend Section */}
            <View style={styles.legendContainer}>
                {[
                    { color: '#2196F3', label: 'Design' },
                    { color: '#FFEB3B', label: 'Soft Skill' },
                    { color: '#4CAF50', label: 'Developer' },
                    { color: '#F44336', label: 'Science' },
                ].map((item, index) => (
                    <View key={index} style={styles.legendItem}>
                        <View style={[styles.legendColor, { backgroundColor: item.color }]} />
                        <Text style={styles.legendText}>{item.label}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
    },
    calendarContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
    },
    calendarMonth: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    calendarDay: {
        width: '14.28%',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#333',
    },
    calendarDate: {
        width: '14.28%',
        textAlign: 'center',
        paddingVertical: 8,
        borderRadius: 5,
        marginVertical: 5,
        color: '#333',
    },
    selectedDate: {
        backgroundColor: '#4CAF50',
        color: '#fff',
    },
    progressContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    progressTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    circularProgressContainer: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    circularBackground: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 10,
        borderColor: '#E0E0E0',
    },
    circularForeground: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 10,
        borderColor: '#4CAF50',
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
    },
    innerCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    progressPercentage: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    progressLabel: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 5,
    },
    legendText: {
        fontSize: 14,
    },
});