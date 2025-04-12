import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ExamSchedule() {
  return (
    <View style={styles.examContainer}>
      <Text style={styles.examTitle}>Exam Schedule</Text>
      {[
        {
          subject: "Biology",
          type: "Lab - One",
          days: "Day - Monday",
          time: "8:30 AM, Date - 4 Dec, 2020",
          image: require("../../assets/images/Group2.png"), // Add file extension
        },
        {
          subject: "Physics",
          type: "Class - Three",
          days: "Day - Tuesday",
          time: "8:30 AM, Date - 3 Dec, 2020",
          image: require("../../assets/images/Group2.png"), // Add file extension
        },
        {
          subject: "Maths",
          type: "Practice - Three",
          days: "Day - Thursday",
          time: "8:30 AM, Date - 5 Dec, 2020",
          image: require("../../assets/images/Group2.png"), // Add file extension
        },
      ].map((exam, index) => (
        <View key={index} style={styles.examItem}>
          <Image source={exam.image} style={styles.examImage} resizeMode="contain" />
          <View>
            <Text style={styles.examSubject}>{exam.subject}</Text>
            <Text style={styles.examDetails}>{exam.type}</Text>
            <Text style={styles.examDetails}>{exam.days}</Text>
            <Text style={styles.examDetails}>{exam.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  examContainer: {
    marginBottom: 20,
  },
  examTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Added color for better readability
  },
  examItem: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000", // Added shadow for better UI
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  examImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 10,
  },
  examSubject: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Added color for better readability
  },
  examDetails: {
    fontSize: 14,
    color: "#777",
  },
});