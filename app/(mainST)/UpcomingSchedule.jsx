import { View, Text } from 'react-native'
import React from 'react'

export default function UpcomingSchedule() {
  return (
    <View style={styles.scheduleContainer}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleTitle}>Upcoming Schedule</Text>
              <Text style={styles.viewAllText}>View All</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleTask}>UX Research</Text>
              <Text style={styles.scheduleDetail}>Ms. Samantha</Text>
              <Text style={styles.scheduleDate}>Jan 5, 2021   7-8 AM</Text>
            </View>
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleTask}>Back-End Developer</Text>
              <Text style={styles.scheduleDetail}>Ms. Samantha</Text>
              <Text style={styles.scheduleDate}>Jan 5, 2021   7-8 AM</Text>
            </View>
          </View>
  )
}

const styles={
    scheduleContainer: {
        marginBottom: 20,
        marginTop: 30,
      },
      scheduleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      scheduleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      viewAllText: {
        fontSize: 14,
        color: '#2196F3',
      },
      scheduleItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#777'
      },
      scheduleTask: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      scheduleDetail: {
        fontSize: 14,
        color: '#777',
      },
      scheduleDate: {
        fontSize: 14,
        color: '#000',
      },
}