import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  ImageBackground,
  Animated,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { generateCourse } from "../../components/provider/students_api";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";

export default function GenerateCourse() {
  const [courseTopic, setCourseTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [response, setResponse] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0]; // For fade animation

  const handleGenerateCourse = async () => {
    setLoading(true);
    try {
      const result = await generateCourse(courseTopic, difficulty);
      setResponse(result);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error("Error generating course:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateNew = () => {
    setCourseTopic("");
    setDifficulty("Beginner");
    setResponse(null);
    setCurrentPage(0);
    fadeAnim.setValue(0); // Reset animation
  };

  const nextPage = () => {
    if (currentPage < response.message.subtopics.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={["#E0F7FA", "#ffff"]}
        style={styles.background}
      >
        {!response && (
          <View style={styles.header}>
            <Text style={styles.title}>Course Generator</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter a course topic"
                placeholderTextColor="#888"
                value={courseTopic}
                onChangeText={setCourseTopic}
              />

              <Picker
                selectedValue={difficulty}
                onValueChange={(itemValue) => setDifficulty(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Beginner" value="Beginner" />
                <Picker.Item label="Intermediate" value="Intermediate" />
                <Picker.Item label="Advanced" value="Advanced" />
              </Picker>

              <TouchableOpacity
                onPress={handleGenerateCourse}
                style={styles.button}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Generate Course</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
        {response && (
          <Animated.View
            style={[styles.responseContainer, { opacity: fadeAnim }]}
          >
            <ScrollView contentContainerStyle={styles.scrollContent}>
              <Text style={styles.topicTitle}>
                {response.message.topic.charAt(0).toUpperCase() +
                  response.message.topic.slice(1)}
              </Text>

              <Text style={styles.subtopicContent}>

                <Markdown>
                  {response.message.subtopics[currentPage].content}
                </Markdown>

              </Text>
            </ScrollView>

            <View style={styles.paginationButtons}>
              <TouchableOpacity
                onPress={previousPage}
                style={[
                  styles.paginationButton,
                  currentPage === 0 && styles.disabledButton,
                ]}
                disabled={currentPage === 0}
              >
                <MaterialIcons name="arrow-back" size={20} color="#fff" />
                <Text style={styles.paginationButtonText}>Previous</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={
                  currentPage === response.message.subtopics.length - 1
                    ? handleGenerateNew
                    : nextPage
                }
                style={styles.paginationButton}
              >
                <Text style={styles.paginationButtonText}>
                  {currentPage === response.message.subtopics.length - 1
                    ? "Generate New"
                    : "Next"}
                </Text>
                <MaterialIcons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}

      </LinearGradient>

      <ImageBackground
        source={require("../../assets/images/PlanRight.png")}
        style={styles.paperPlane}
      />
      <ImageBackground
        source={require("../../assets/images/Cloud.png")}
        style={styles.cloud}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

  },
  background: {
    flex: 1,
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  header: {
    width: "90%",
    height: 'auto',
    backgroundColor: "#ffff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 20,
    alignSelf: 'center',
    marginTop: 60
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFA500",
    borderRadius: 10,
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  cloud: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  paperPlane: {
    position: "absolute",
    bottom: 40,
    right: 10,
    width: 130,
    height: 230,
    resizeMode: "contain",
  },
  responseContainer: {
    width: "90%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 20,
    marginBottom: 20,
    flex: 1,
    zIndex: 20,
  },
  topicTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  subtopicTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  subtopicContent: {
    fontSize: 16,
    marginBottom: 16,
    color: "#666",
    lineHeight: 24,
  },
  paginationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  paginationButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#4A90E2",
    borderRadius: 8,
    marginHorizontal: 8,
  },
  paginationButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});