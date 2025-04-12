import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { getSubjects, getChapters } from "../../components/provider/teachers_api";
import { MyContext } from "../../components/provider/contextApi";
import { mockTest } from "../../components/provider/students_api";
import UUID from "react-native-uuid";
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const MockTest = () => {
  const { existingUser } = useContext(MyContext);

  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [isSubjectDropdownVisible, setIsSubjectDropdownVisible] = useState(false);
  const [isChapterDropdownVisible, setIsChapterDropdownVisible] = useState(false);
  const [isMarksDropdownVisible, setIsMarksDropdownVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state

  const [filters, setFilters] = useState({
    username: existingUser.username,
    board: existingUser.boards,
    grade: existingUser.classes,
    subject: "",
    chapter: [],
    total_marks: "25",
    sender: existingUser.usertype,
    sessionID: UUID.v4(),
    chatID: `weiry${UUID.v4()}`,
  });

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const confirmFilters = () => {
    closeModal();
    handleFilterClick();
  };

  const fetchSubjects = async (selectedGrade, selectedBoard) => {
    setLoading(true);
    try {
      const response = await getSubjects(selectedGrade, selectedBoard);

      // Debugging log: Check the response format
      console.log('Fetched Subjects:', response);

      // Ensure subjects is an array
      if (Array.isArray(response)) {
        setSubjects(response); // Set subjects if response is an array
      } else {
        console.warn('Subjects response is not in the expected format:', response);
        setSubjects([]); // Clear subjects if response is invalid
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setSubjects([]); // Clear subjects on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch chapters based on grade, board, and subject
  const fetchChapters = async (selectedGrade, selectedBoard, selectedSubject) => {
    setLoading(true);
    try {
      const response = await getChapters(selectedGrade, selectedBoard, selectedSubject);
      console.log('Fetched Chapters:', response);
      if (Array.isArray(response)) {
        setChapters(response); // Set chapters if response is an array
      } else {
        console.warn('Chapters response is not in the expected format:', response);
        setChapters([]); // Clear chapters if response is invalid
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
      setChapters([]); // Clear chapters on error
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (filters.grade && filters.board) {
      fetchSubjects(filters.grade, filters.board);
    }
  }, [filters.grade, filters.board]);

  useEffect(() => {
    if (filters.subject) {
      fetchChapters(filters.grade, filters.board, filters.subject);
    }
  }, [filters.subject]);

  const handleChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    if (key === "subject") {
      updatedFilters.chapter = [];
      setSelectedChapters([]);
      setChapters([]);
    }
  };

  const handleChapterSelect = (chapterName) => {
    const isSelected = selectedChapters.includes(chapterName);
    const updatedChapters = isSelected
      ? selectedChapters.filter((chapter) => chapter !== chapterName)
      : [...selectedChapters, chapterName];

    setSelectedChapters(updatedChapters);

    setFilters((prev) => ({
      ...prev,
      chapter: updatedChapters,
    }));
  };

  const handleFilterClick = async () => {
    setLoading(true); // Start loader
    try {
      await sendData();
      setIsModalVisible(true);
    } catch (error) {
      console.error("Error applying filters:", error.message);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const sendData = async () => {
    setLoading(true);
    try {
      const response = await mockTest(filters);
      // router.push("(mainST)/MockExam", { params: { response } });
      router.push({
        pathname:'(mainST)/MockExam',
        params: { message: JSON.stringify(response.message) }
      });
    } catch (error) {
      console.error(
        "Error sending data:",
        error.response?.data || error.message || "An unknown error occurred."
      );
      throw error;
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const mockTests = [
    {
      id: '1',
      title: 'English',
      grade: 'Grade - 9',
      timeLimit: '10 Mins',
      questionLimit: '7 Days',
      image: require('../../assets/images/Group2.png'),
    },
    {
      id: '2',
      title: 'Maths',
      grade: 'Grade - 9',
      timeLimit: '10 Mins',
      questionLimit: '7 Days',
      image: require('../../assets/images/Group2.png'),
    },
    {
      id: '3',
      title: 'Chemistry',
      grade: 'Grade - 11',
      timeLimit: '10 Mins',
      questionLimit: '12 Days',
      image: require('../../assets/images/Group2.png'),
    },
  ];

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="fade"
        onRequestClose={closeModal}>
        
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selected Filters</Text>
            <Text>Subject: {filters.subject || "None"}</Text>
            <Text>Chapters: {selectedChapters.length > 0 ? selectedChapters.join(", ") : "None"}</Text>
            <Text>Marks: {filters.total_marks || "None"}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={confirmFilters}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mock Test</Text>
        <Text style={styles.headerSubtitle}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
      </View>

      <View style={styles.filterSection}>
        {/* Subject Dropdown */}
        <Text style={styles.label}>Subject</Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={filters.subject}
            onValueChange={(value) => handleChange('subject', value)} >
            <Picker.Item label="Select Subject" value="" />
            {subjects && subjects.length > 0 ? (
              subjects.map((subject) => (
                <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
              ))
            ) : (
              <Picker.Item label="No subjects available" value="" />
            )}
          </Picker>
        </View>

        {/* Chapter Dropdown */}
        <Text style={styles.label}>Chapter</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownToggle}
            onPress={() => setIsChapterDropdownVisible((prev) => !prev)}
          >
            <Text style={styles.dropdownToggleText}>
              {selectedChapters.length > 0
                ? selectedChapters.join(', ')
                : 'Select Chapters'}
            </Text>
          </TouchableOpacity>
          {isChapterDropdownVisible && (
            <View style={styles.dropdownMenu}>
              {chapters.map((chapter) => (
                <TouchableOpacity
                  key={chapter.id}
                  style={styles.dropdownItem}
                  onPress={() => handleChapterSelect(chapter.name)}
                >
                  <Text style={styles.dropdownItemText}>
                    {selectedChapters.includes(chapter.name) ? '\u2713 ' : ''}
                    {chapter.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Marks Dropdown */}
        <Text style={styles.label}>Marks</Text>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownToggle}
            onPress={() => {
              setIsChapterDropdownVisible(false);
              setIsMarksDropdownVisible((prev) => !prev);
            }}
          >
            <Text style={styles.dropdownToggleText}>
              {filters.total_marks || 'Select Marks'}
            </Text>
          </TouchableOpacity>
          {isMarksDropdownVisible && (
            <View style={styles.dropdownMenu}>
              {['25', '50'].map((mark) => (
                <TouchableOpacity
                  key={mark}
                  style={styles.dropdownItem}
                  onPress={() => {
                    handleChange('total_marks', mark);
                    setIsMarksDropdownVisible(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{mark}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Apply Filter Button */}
        <TouchableOpacity
          style={styles.applyButton}
          onPress={showModal}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.applyButtonText}>Generate Mock Test</Text>
          )}
        </TouchableOpacity>
      </View>;


      <FlatList
        data={mockTests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} resizeMode="contain"/>
            <View style={styles.cardDetails}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardText}>{item.grade}</Text>
              <Text style={styles.cardText}>Time Limits - {item.timeLimit}</Text>
              <Text style={styles.cardText}>
                Question - {item.questionLimit}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
  
const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20,paddingTop:10, backgroundColor: "#f5f5f5" },
  header: { marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 8, color: "#333" },
  headerDescription: { fontSize: 14, color: "#555" },
  filterSection: { marginTop: 20 },
  dropdownContainer: { marginBottom: 15, },
  dropdownToggle: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
  },
  label: {
    marginBottom: 4,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#ffff',
    marginBottom: 15,
  },
  dropdownToggleText: { fontSize: 16, color: "#333" },
  dropdownMenu: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 50,
    padding: 10,
    position: "absolute",
    zIndex: 1000,
    width: "100%",
  },
  dropdownItem: { paddingVertical: 8 },
  dropdownItemText: { fontSize: 16, color: "#333" },
  applyButton: {
    backgroundColor: "#3498db",
    padding: 12,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 30
  },
  applyButtonText: { color: "#fff", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 8, width: 300 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  modalButton: {
    padding: 10,
    backgroundColor: "#3498db",
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: { color: "#fff" },
  header: {
    backgroundColor: '#c3d4f7',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  cardDetails: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
});



export default MockTest;
