import { View, Text } from 'react-native'
import React from 'react'

export default function Schedule() {
  return (
     <View style={styles.scheduleSection}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            <View style={styles.scheduleChartContainer}>
              <View style={styles.hoursColumn}>
                {["2.5", "2", "1.5", "1", "0"].map((hour, index) => (
                  <Text key={index} style={styles.hourLabel}>
                    {hour}
                  </Text>
                ))}
              </View>
              <View style={styles.scheduleChart}>
                <View style={styles.scheduleBar}>
                  <Text style={styles.barLabel}>UX Research</Text>
                  <View
                    style={[
                      styles.barFill,
                      { height: "30%", backgroundColor: "#64B6F7" },
                    ]}
                  />
                </View>
                <View style={styles.scheduleBar}>
                  <Text style={styles.barLabel}>UI Designer Tasks</Text>
                  <View
                    style={[
                      styles.barFill,
                      { height: "80%", backgroundColor: "#F7B664" },
                    ]}
                  />
                </View>
                <View style={styles.scheduleBar}>
                  <Text style={styles.barLabel}>Full Stack Dev</Text>
                  <View
                    style={[
                      styles.barFill,
                      { height: "100%", backgroundColor: "#4CAF50" },
                    ]}
                  />
                </View>
    
              </View>
            </View><Text style={{ marginTop: 20, left: 30 }}>Duration(Hours)</Text>
          </View>
  )
}


const styles={
    scheduleSection: {
        padding: 16,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 2,
        marginBottom: 30
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
      },
      scheduleChartContainer: {
        flexDirection: "row",
        alignItems: "flex-end", 
        paddingTop: 20
      },
      hoursColumn: {
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 10,
        height: 160, 
      },
      hourLabel: {
        fontSize: 12,
        color: "#555",
      },
      scheduleChart: {
        flexDirection: "row",
        alignItems: "flex-end",
        flex: 1,
        height: 150, 
        borderLeftWidth: 1,
        borderColor: "#ddd",
        paddingLeft: 10,
      },
      scheduleBar: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
      },
      barLabel: {
        fontSize: 12,
        color: "#666",
        marginBottom: 5,
      },
      barFill: {
        width: "60%",
        borderRadius: 4,
      },
}