import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ToDoContainer() {
  return (
    <View style={styles.todoContainer}>
            <View style={styles.todoHeader}>
              <Text style={styles.sectionTitle}>To Do List</Text>
              <TouchableOpacity>
                <Text style={styles.editIcon}>✏️</Text>
              </TouchableOpacity>
            </View>
            {[
              { task: 'Join UI Design Class with my friends', time: 'Sunday, 9:00 AM' },
              { task: 'Do the assignment given by coach Dery', time: 'Sunday, 5:00 PM' },
              { task: 'Upgrade to premium', time: 'Sunday, 7:00 AM' },
              { task: 'Upgrade to premium', time: 'Sunday, 8:10 AM' },
            ].map((item, index) => (
              <View key={index} style={styles.todoItem}>
                <TouchableOpacity style={styles.checkbox}></TouchableOpacity>
                <View>
                  <Text style={styles.todoTask}>{item.task}</Text>
                  <Text style={styles.todoTime}>{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
  )
}

const styles={
    todoContainer: {
        marginBottom: 24,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
      },
      todoHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      },
      editIcon: {
        fontSize: 18,
        color: '#007BFF',
      },
      todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      },
      checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 4,
        marginRight: 12,
      },
      todoTask: {
        fontSize: 16,
      },
      todoTime: {
        fontSize: 14,
        color: '#777',
      },
}