import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, TextInput, StyleSheet, ActivityIndicator, TouchableOpacity, Alert, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CompleteSubTopic, getBoards, getChapters, getGrades, getSubjects, getSubtopic } from "@/components/provider/teachers_api";

const SyllabusUpdate = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [filters, setFilters] = useState({
    grade: "",
    board: "",
    subject: "",
    chapternumber: "",
    subtopic_name: "",
    beforesub_topic: "",
    aftersub_topic: "",
    newSubtopic_Name: "",
    new_subtopic: "",
    remarks: "",
  });


  const [grades, setGrades] = useState([]);
  const [boards, setBoards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGrades = async () => {
    setLoading(true);
    try {
      const response = await getGrades();
      setGrades(response);
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
      setBoards(response || []);
    } catch (error) {
      console.error("Error fetching boards:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async (selectedGrade, selectedBoard) => {
    setLoading(true);
    try {
      const response = await getSubjects(selectedGrade, selectedBoard);
      setSubjects(response || []);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChapters = async (selectedGrade, selectedBoard, selectedSubject) => {
    setLoading(true);
    try {
      const response = await getChapters(selectedGrade, selectedBoard, selectedSubject);
      setChapters(response || []);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubtopics = async (selectedGrade, selectedBoard, selectedSubject, selectedChapter) => {
    setLoading(true);
    try {
      const response = await getSubtopic(selectedGrade, selectedBoard, selectedSubject, selectedChapter);
      setSubtopics(response || []);
    } catch (error) {
      console.error("Error fetching subtopics:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (key, value) => {
    const updatedFilters = { ...filters, [key]: value };

    if (key === "grade") {
      updatedFilters.board = "";
      updatedFilters.subject = "";
      updatedFilters.chapternumber = "";
      updatedFilters.subtopic_name = "";
      setBoards([]);
      setSubjects([]);
      setChapters([]);
      setSubtopics([]);
      if (value) await fetchBoards(value);
    } else if (key === "board") {
      updatedFilters.subject = "";
      updatedFilters.chapternumber = "";
      updatedFilters.subtopic_name = "";
      setSubjects([]);
      setChapters([]);
      setSubtopics([]);
      if (value) await fetchSubjects(filters.grade, value);
    } else if (key === "subject") {
      updatedFilters.chapternumber = "";
      updatedFilters.subtopic_name = "";
      setChapters([]);
      setSubtopics([]);
      if (value) await fetchChapters(filters.grade, filters.board, value);
    } else if (key === "chapternumber") {
      updatedFilters.subtopic_name = "";
      setSubtopics([]);
      if (value) await fetchSubtopics(filters.grade, filters.board, filters.subject, value);
    }

    setFilters(updatedFilters);
  };


  const handleSubmit = async () => {
    console.log("Res", filters);
    setLoading(true);
    try {
      const res = await CompleteSubTopic(filters);
      console.log("Res", res.data.message);
      Alert.alert("Syllabus", res.data.message)

    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchGrades();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Update Syllabus</Text>
      {loading && <ActivityIndicator size="large" color="steelblue" style={styles.loader} />}

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

          <Picker selectedValue={filters.board} onValueChange={(value) => handleChange("board", value)} style={styles.picker}>
            <Picker.Item label="Select Board" value="" />
            {boards.map((board) => (
              <Picker.Item key={board.id} label={board.name} value={board.id} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Subject</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={filters.subject} onValueChange={(value) => handleChange("subject", value)} style={styles.picker}>
            <Picker.Item label="Select Subject" value="" />
            {subjects.map((subject) => (
              <Picker.Item key={subject.id} label={subject.name} value={subject.id} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Chapter</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={filters.chapternumber} onValueChange={(value) => handleChange("chapternumber", value)} style={styles.picker}>
            <Picker.Item label="Select Chapter" value="" />
            {chapters.map((chapter) => (
              <Picker.Item key={chapter.id} label={chapter.name} value={chapter.id} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Subtopic</Text>
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={filters.subtopic_name} onValueChange={(value) => handleChange("subtopic_name", value)} style={styles.picker}>
            <Picker.Item label="Select Subtopic" value="" />
            {Array.isArray(subtopics) &&
              subtopics.map((subtopic) => (
                <Picker.Item key={subtopic.id} label={subtopic.name} value={subtopic.name} />
              ))}
          </Picker>
        </View>


        {/* AddNew Subtopic */}
        <View>
          {/* Button to Open Modal */}
          <TouchableOpacity onPress={toggleModal} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add New</Text>
          </TouchableOpacity>

          {/* Modal */}
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={toggleModal}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Add New Subtopic</Text>

                {/* Select Before Subtopic */}
                <Text style={styles.label}>Select Before Sub-Topic</Text>
                <View style={styles.pickerWrapper}>

                  <Picker
                    selectedValue={filters.beforesub_topic}
                    onValueChange={(value) => handleChange("beforesub_topic", value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Subtopic" value="" />
                    {subtopics.map((sub) => (
                      <Picker.Item key={sub.id} label={sub.name} value={sub.id} />
                    ))}
                  </Picker>
                </View>

                {/* Select After Subtopic */}
                <Text style={styles.label}>Select After Sub-Topic</Text>
                <View style={styles.pickerWrapper}>

                  <Picker
                    selectedValue={filters.aftersub_topic}
                    onValueChange={(value) => handleChange("aftersub_topic", value)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Subtopic" value="" />
                    {subtopics.map((sub) => (
                      <Picker.Item key={sub.id} label={sub.name} value={sub.id} />
                    ))}
                  </Picker>
                </View>

                {/* Text Input for New Subtopic */}
                <Text style={styles.label}>Enter New Sub-Topic</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter subtopic name"
                  value={filters.new_subtopic}
                  onChangeText={(text) => handleChange("new_subtopic", text)}
                />

                {/* Remarks Field */}
                <Text style={styles.label}>Remarks</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter remarks"
                  value={filters.remarks}
                  onChangeText={(text) => handleChange("remarks", text)}
                />

                {/* Close Button */}
                <TouchableOpacity onPress={toggleModal} style={[styles.closeButton,{backgroundColor:'green',marginBottom:10}]}>
                  <Text style={styles.closeButtonText}>Submit</Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>


      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SyllabusUpdate;

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  dropdownContainer: {
    marginBottom: 10,
    borderRadius: 10,
    padding: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
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

  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: '100%'
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }], // Adjust for centering
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },


  // AddNew
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginVertical: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: "#FF0000",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },

});
