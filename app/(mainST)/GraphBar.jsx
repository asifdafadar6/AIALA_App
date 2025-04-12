import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { MyContext } from '../../components/provider/contextApi';
import { getAssessmentDetails } from '../../components/provider/students_api';
import Feather from 'react-native-vector-icons/Feather';

export default function GraphBar() {
  const { existingUser } = useContext(MyContext);

  const [assessmentDetails, setAssessmentDetails] = useState([]);
  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);

  const fetchGetAssessmentDetails = async () => {
    try {
      const response = await getAssessmentDetails(existingUser.username);
      setAssessmentDetails(response);
    } catch (error) {
      console.error("Dashboard error", error);
    }
  };

  useEffect(() => {
    fetchGetAssessmentDetails();
  }, []);

  const handlePreviousSubject = () => {
    setCurrentSubjectIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNextSubject = () => {
    setCurrentSubjectIndex((prevIndex) =>
      prevIndex < assessmentDetails.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const currentAssessment = assessmentDetails[currentSubjectIndex] || {};

  const chartData = {
    labels: assessmentDetails.length
      ? ["Equation", "Reaction", "Chemical", "Chemical"]
      : ["Equation", "Reaction", "Chemical", "Chemical"],
    datasets: [
      {
        data: assessmentDetails.length
          ? assessmentDetails.map((item, index) => `${index + 1}`)
          : [10, 20, 30, 40],
      },
    ],
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{currentAssessment.subject || "Not Available"}</Text>
        <Text style={styles.percentage}>
          {currentAssessment.percentage || "0"}%
        </Text>
      </View>

      <BarChart
        data={chartData}
        width={screenWidth - 40}
        height={240}
        yAxisLabel=""
        yAxisSuffix=""
        withInnerLines={false}
        fromZero
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          barPercentage: 0.6,
          color: (opacity = 1, index) => {
            const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
            return colors[index % colors.length] || `rgba(0, 123, 255, ${opacity})`;
          },
          labelColor: () => `#EB6A39`,
          style: {
            borderRadius: 16,
            elevation: 4,
          },
          barRadius: 8,
        }}
        verticalLabelRotation={0}
        showBarTops={false}
      />

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          onPress={handlePreviousSubject}
          disabled={currentSubjectIndex === 0}
          style={styles.navigationButton}
        >
          <Feather
            name="arrow-left-circle"
            size={28}
            color={currentSubjectIndex === 0 ? 'gray' : 'black'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNextSubject}
          disabled={currentSubjectIndex === assessmentDetails.length - 1}
          style={styles.navigationButton}
        >
          <Feather
            name="arrow-right-circle"
            size={28}
            color={currentSubjectIndex === assessmentDetails.length - 1 ? 'gray' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  percentage: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#EB6A39",
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  navigationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});