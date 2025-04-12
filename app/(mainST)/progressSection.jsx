import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { MaterialIcons } from "@expo/vector-icons"; // For icons

export default function ProgressSection() {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.progressSection}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Progress</Text>
        <MaterialIcons name="trending-up" size={24} color="#4CAF50" />
      </View>

      {/* Line Chart */}
      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              data: [80, 90, 70, 85, 95, 100, 90],
              color: () => "#5B84C4", // Blue line
            },
            {
              data: [60, 70, 50, 65, 75, 80, 70],
              color: () => "#FFC107", // Yellow line
            },
          ],
        }}
        width={screenWidth - 40} // Dynamic width
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: () => "#333", // Axis and label color
          labelColor: () => "#777", // Label color
          strokeWidth: 2, // Line thickness
          propsForDots: {
            r: "5", // Dot size
            strokeWidth: "2",
            stroke: "#fff", // Dot border color
          },
          propsForBackgroundLines: {
            stroke: "#eee", // Grid line color
            strokeDasharray: "0", // Solid lines
          },
        }}
        bezier // Smooth lines
        style={styles.chartStyle}
      />

      {/* Progress Summary */}
      <View style={styles.progressSummary}>
        <View style={styles.summaryItem}>
          <MaterialIcons name="arrow-upward" size={16} color="#4CAF50" />
          <Text style={styles.progressIncrease}>+32% This Week</Text>
        </View>
        <View style={styles.summaryItem}>
          <MaterialIcons name="arrow-upward" size={16} color="#FFC107" />
          <Text style={styles.progressLastWeek}>+24 Last Week</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  chartStyle: {
    marginVertical: 10,
    borderRadius: 12,
    overflow: "hidden",
  },
  progressSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressIncrease: {
    color: "#4CAF50",
    fontWeight: "bold",
    marginLeft: 8,
  },
  progressLastWeek: {
    color: "#FFC107",
    fontWeight: "bold",
    marginLeft: 8,
  },
});