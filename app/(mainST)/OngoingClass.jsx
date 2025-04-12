import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function OngoingClass() {
  return (
     <View style={styles.ongoingClassesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ongoing Classes</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ongoingClass}>
              <Text style={styles.classTitle}>UI Design Basic</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '75%', backgroundColor: '#64B6F7' }]} />
                <Text style={styles.progressText}>75%</Text>
              </View>
            </View>
            <View style={styles.ongoingClass}>
              <Text style={styles.classTitle}>UI Design Advanced</Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '50%', backgroundColor: '#F7B664' }]} />
                <Text style={styles.progressText}>50%</Text>
              </View>
            </View>
          </View>
  )
}

const styles = {
  ongoingClassesSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  ongoingClass: {
    marginBottom: 15,
  },
  classTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginRight: 10,
  },
  progressText: {
    width: 40,
    height: 40,
    fontSize: 12,
    color: "#fff",
    backgroundColor: "#234782",
    borderRadius: 20,
    textAlign: "center",
    lineHeight: 40,
    fontWeight: "bold",
  },
  viewAllText: {
    fontSize: 14,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  
};
