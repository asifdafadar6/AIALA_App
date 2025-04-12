import { View, Text } from 'react-native'
import React from 'react'

export default function UpcomingTask() {
  return (
   <View style={styles.taskContainer}>
           <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
           {[
             { title: 'Discussion Algorithm', time: '8:00 AM - 12 PM', color: '#F44336', initial: 'A' },
             { title: 'Fundamental Math', time: '12:00 PM - 3:00 PM', color: '#FFEB3B', initial: 'M' },
             { title: 'DNA Modifications in Humans', time: 'Ongoing', color: '#2196F3', initial: 'H' },
           ].map((task, index) => (
             <View key={index} style={styles.taskItem}>
               <View style={[styles.taskIcon, { backgroundColor: task.color }]}>
                 <Text style={styles.taskInitial}>{task.initial}</Text>
               </View>
               <View style={styles.taskDetails}>
                 <Text style={styles.taskTitle}>{task.title}</Text>
                 <Text style={styles.taskTime}>{task.time}</Text>
               </View>
             </View>
           ))}
         </View>
  )
}

const styles={
  taskContainer: {
    padding: 20,
    paddingHorizontal: 0,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  taskIcon: {
    width: 60,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  taskInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 14,
    color: '#777',
  },
}