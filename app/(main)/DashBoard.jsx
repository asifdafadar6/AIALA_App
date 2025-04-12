import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { getBoards, getGrades, getSubjects } from "@/components/provider/teachers_api";
import UpdateSyllabusPopUp from "./UpdateSyllabusPopUp";
import Grade from './Grade'


export default function Dashboard() {
  const [grades, setGrades] = useState([]);
  const [boards, setBoards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);


  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const [filters, setFilters] = useState({
    grade: "",
    board: "",
    subject: "",
  });

  const fetchGrades = async () => {
    setLoading(true);
    try {
      const response = await getGrades();
      setGrades(response);
      console.log("Grades:", response);
    } catch (error) {
      console.error("Error fetching grades:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBoards = async (selectedGrade) => {
    setLoading(true);
    try {
      const response = await getBoards(selectedGrade);
      setBoards(response);
      console.log("Boards:", response);
    } catch (error) {
      console.error("Error fetching boards:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async (selectedGrade, selectedBoard) => {
    if (!selectedGrade || !selectedBoard) return;
    setLoading(true);
    try {
      const response = await getSubjects(selectedGrade, selectedBoard);
      setSubjects(response);
      console.log("Subjects:", response);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const handleChange = async (key, value) => {
    const updatedFilters = { ...filters, [key]: value };

    if (key === "grade") {
      updatedFilters.board = "";
      updatedFilters.subject = "";
      setBoards([]);
      setSubjects([]);
      if (value) await fetchBoards(value);
    } else if (key === "board") {
      updatedFilters.subject = "";
      setSubjects([]);
      if (value) await fetchSubjects(filters.grade, value);
    }
    setFilters(updatedFilters);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Lead with Innovation</Text>
          <Text style={styles.bannerSubtitle}>
            AIALA helps you inspire brilliance and nurture future leaders.
          </Text>
          <Image
            source={{ uri: "https://t3.ftcdn.net/jpg/01/80/83/76/360_F_180837604_UyJZNTHPluIJNQJjmTkCpE4XLJ03Zott.jpg" }}
            style={styles.bannerImage}
          />
        </View>

        {/* Update Syllabus Button */}

        <TouchableOpacity style={styles.UpdateSyllabus} onPress={togglePopup}>
          <Text style={styles.UpdateSyllabusText}>Update Syllabus</Text>
        </TouchableOpacity>


        {/* Modal Popup */}
        <Modal
          visible={isPopupVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={togglePopup}>
          <View style={styles.modalBackground}>
            <View style={styles.popupContainer}>
              <UpdateSyllabusPopUp />
              <TouchableOpacity style={styles.closeButton} onPress={togglePopup}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Statistics Section */}
        {/* <View style={styles.statsContainer}>
          <View style={[styles.statBox, { backgroundColor: "#4CAF50" }]}>
            <Text style={styles.statNumber}>1450+</Text>
            <Text style={styles.statLabel}>Students Count</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: "#FF9800" }]}>
            <Text style={styles.statNumber}>120+</Text>
            <Text style={styles.statLabel}>Teachers Count</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: "#2196F3" }]}>
            <Text style={styles.statNumber}>95%</Text>
            <Text style={styles.statLabel}>Average Score</Text>
          </View>
        </View> */}
        <Grade />

        {/* Top Performers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performers Students</Text>

          {/* <View style={styles.dropdownContainer}>
            <Text>Grade</Text>
            <Picker
              selectedValue={filters.grade}
              onValueChange={(itemValue) =>
                setFilters((prev) => ({ ...prev, grade: itemValue, board: "", subject: "" }))
              }
              style={styles.dropdown}>
              <Picker.Item label="Select Grade" value="" />
              {grades.map((grade) => (
                <Picker.Item key={grade.id} label={grade.name} value={grade.id} />
              ))}
            </Picker>

            <Text>Board</Text>
            <Picker
              selectedValue={filters.board}
              onValueChange={(itemValue) =>
                setFilters((prev) => ({ ...prev, board: itemValue, subject: "" }))
              }
              style={styles.dropdown}
            >
              <Picker.Item label="Select Board" value="" />
              {boards.map((board) => (
                <Picker.Item key={board.id} label={board.name} value={board.id} />
              ))}
            </Picker>

            <Text>Subject</Text>
            <Picker
              selectedValue={filters.subject}
              onValueChange={(itemValue) =>
                setFilters((prev) => ({ ...prev, subject: itemValue }))
              }
              style={styles.dropdown}
            >
              <Picker.Item label="Select Subject" value="" />
              {subjects.map((subject) => (
                <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
              ))}
            </Picker>
          </View> */}

          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Grade</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={filters.grade}
                onValueChange={(value) => handleChange("grade", value)}
                style={styles.picker}
              >
                <Picker.Item label="Select Grade" value="" />
                {grades.map((g) => (
                  <Picker.Item key={g.id} label={g.name} value={g.id} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Board</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={filters.board}
                onValueChange={(value) => handleChange("board", value)}
                style={styles.picker}
              >
                <Picker.Item label="Select Grade" value="" />
                {boards.map((g) => (
                  <Picker.Item key={g.id} label={g.name} value={g.id} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Subject</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={filters.subject}
                onValueChange={(value) => handleChange("subject", value)}
                style={styles.picker}
              >
                <Picker.Item label="Select Grade" value="" />
                {subjects.map((g) => (
                  <Picker.Item key={g.id} label={g.name} value={g.id} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: "https://t3.ftcdn.net/jpg/01/80/83/76/360_F_180837604_UyJZNTHPluIJNQJjmTkCpE4XLJ03Zott.jpg" }}
              style={styles.cardImage}
            />
            <View>
              <Text style={styles.cardTitle}>Charlotte Smith</Text>
              <Text style={styles.cardSubtitle}>Grade 10</Text>
            </View>
          </View>
        </View>


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
  },
  banner: {
    backgroundColor: "#FFD700",
    padding: 14,
    marginHorizontal: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    color: "#333",
  },
  bannerSubtitle: {
    fontSize: 14,
    flex: 1,
    color: "#555",
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  UpdateSyllabus: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: "flex-end",
    marginVertical: 15,
    elevation: 2,
    marginRight: 10,
  },
  UpdateSyllabusText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: '100%'
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
    paddingHorizontal: 10
  },
  statBox: {
    width: "30%",
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    flexWrap: 'nowrap'
  },
  section: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 1,
    marginTop: 5,
  },
  picker: {
    color: "#333",
    height: 50,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    elevation: 2,
    marginBottom: 12,
  },
  cardImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navButton: {
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
});

