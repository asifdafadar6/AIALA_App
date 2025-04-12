import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

export default function Notifications() {
     const notifications = [
        { title: '5 Product Sold', time: '14:36 PM', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: '🛒' },
        { title: 'Invoice for UI Kits', time: '14:36 PM', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: '📄' },
        { title: 'Carlie Smith', time: '14:36 PM', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: '👤' },
        { title: 'Income $10,000', time: '14:36 PM', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: '💰' },
        { title: 'Income $10,000', time: '14:36 PM', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: '💰' },
        { title: 'Income $10,000', time: '14:36 PM', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: '💰' },
        { title: 'Income $10,000', time: '14:36 PM', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: '💰' },
        { title: 'Income $10,000', time: '14:36 PM', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', icon: '💰' },
      ];
  return (
     <View style={styles.notificationContainer}>
            <Text style={styles.sectionTitle}>Notifications Center</Text>
            <View style={styles.tabContainer}>
              <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                <Text style={styles.tabText}>All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab}>
                <Text style={styles.tabText}>Unread (6)</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <Text style={styles.dateHeader}>Today</Text>
              {notifications.slice(0, 3).map((item, index) => (
                <View key={index} style={styles.notificationItem}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{item.icon}</Text>
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationDescription}>{item.description}</Text>
                  </View>
                  <Text style={styles.notificationTime}>{item.time}</Text>
                </View>
              ))}
    
              <Text style={styles.dateHeader}>Yesterday, 8th August, 2022</Text>
              {notifications.slice(3).map((item, index) => (
                <View key={index} style={styles.notificationItem}>
                  <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{item.icon}</Text>
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationDescription}>{item.description}</Text>
                  </View>
                  <Text style={styles.notificationTime}>{item.time}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
  )
}


const styles={
    notificationContainer: {
        marginBottom: 24,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 10
      },
      tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#F0F0F0',
      },
      activeTab: {
        backgroundColor: '#007BFF',
      },
      tabText: {
        color: '#FFF',
      },
      dateHeader: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginTop: 16,
        marginBottom: 8,
      },
      notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 12,
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
      },
      icon: {
        fontSize: 18,
      },
      notificationContent: {
        flex: 1,
      },
      notificationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      notificationDescription: {
        fontSize: 14,
        color: '#777',
      },
      notificationTime: {
        fontSize: 12,
        color: '#999',
      },
}