import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  FlatList,
  Modal,
  Button,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getBoards, getSubjects, getChapters } from '../../components/provider/teachers_api';
import { MyContext } from '../../components/provider/contextApi';
import uuid from "react-native-uuid";
import { AssessmentRequest } from '../../components/provider/assesment_api';
import { router } from 'expo-router';


export default function GenerateAssessments() {
  const [activeTab, setActiveTab] = useState('Academic');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const sessionId = uuid.v4();

  const [formData, setFormData] = useState({
    grade: '',
    board: '',
    subject: '',
    chapter: [],
    description: '',
    choose: '',
    marks_choose: '',
    blanks: '',
    marks_blanks: '',
    question: '',
    marks_question: '',
    matchfollowing: '',
    marks_match: '',
    total_marks: '',
    timeLimit: '60',
    validity: '7',
    sender: "Assessment",
    sessionID: sessionId,
    chatID: `assgenID_${sessionId}`,
  });


  const { grade = [] } = useContext(MyContext);

  const [boards, setBoards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState(formData.chapter || []);
  const [modalVisible, setModalVisible] = useState(false);


  const validateAndProceed = () => {
    if (activeTab === 'Academic') {
      if (!formData.grade || !formData.board || !formData.subject || !formData.chapter) {
        alert('Please fill in all the required fields before proceeding.');
        return; // Prevent the tab switch if validation fails
      }
      setActiveTab('Question Types');
    } else if (activeTab === 'Question Types') {
      const questionTypes = [
        { count: formData.choose, marks: formData.marks_choose },
        { count: formData.blanks, marks: formData.marks_blanks },
        { count: formData.question, marks: formData.marks_question },
        { count: formData.matchfollowing, marks: formData.marks_match },
      ];

      const validQuestionTypes = questionTypes.filter(
        (q) => q.count && q.marks && parseInt(q.count) > 0 && parseInt(q.marks) > 0
      ).length;

      if (validQuestionTypes < 2) {
        alert("Please enter at least two types of questions and it's numbers.");
        return;
      }
      setActiveTab('Time Limits');
    } else if (activeTab === 'Time Limits') {
      if (!formData.timeLimit) {
        alert('Please fill in the time limit and exam validity fields before proceeding.');
        return;
      }

      setModalVisible(true);


    }
  };

  const handleAssessmentSubmit = async () => {
    try {
      console.log("Form Data:", formData);

      const response = await AssessmentRequest(formData);
      console.log("Assessment Request Response:", response);

      if (response && response.message) {
        router.push({
          pathname: '/AssessmentReview',
          params: { message: JSON.stringify(response.message) }
        });


      } else {
        alert("Failed to submit assessment. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };



  const validateForm = () => {
    if (!formData.grade) {
      setError("Please select a grade.");
      return false;
    }
    if (!formData.board) {
      setError("Please select a board.");
      return false;
    }
    if (!formData.subject) {
      setError("Please select a subject.");
      return false;
    }
    if (selectedChapters.length === 0) {
      setError("Please select at least one chapter.");
      return false;
    }
    setError(""); // Clear any previous error
    return true;
  };

  const fetchBoards = async (selectedGrade) => {
    try {
      const response = await getBoards(selectedGrade);
      setBoards(response);
      console.log("Assess", response);

    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const fetchSubjects = async (selectedGrade, selectedBoard) => {
    try {
      const response = await getSubjects(selectedGrade, selectedBoard);
      setSubjects(response);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchChapters = async (selectedGrade, selectedBoard, selectedSubject) => {
    try {
      const response = await getChapters(selectedGrade, selectedBoard, selectedSubject);
      setChapters(response);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  const handleChange = async (name, value) => {
    const updatedValues = { ...formData, [name]: value };

    if (name === 'grade') {
      updatedValues.board = '';
      updatedValues.subject = '';
      updatedValues.chapter = [];
      setBoards([]);
      setSubjects([]);
      setChapters([]);
      if (value) await fetchBoards(value);
    } else if (name === 'board') {
      updatedValues.subject = '';
      updatedValues.chapter = [];
      setSubjects([]);
      setChapters([]);
      if (value) await fetchSubjects(formData.grade, value);
    } else if (name === 'subject') {
      updatedValues.chapter = [];
      setChapters([]);
      if (value) await fetchChapters(formData.grade, formData.board, value);
    }
    setFormData(updatedValues);
  };

  const handleChapterSelect = (e) => {
    const { value, checked } = e.target;
    const updatedChapters = checked
      ? [...selectedChapters, value]
      : selectedChapters.filter(chapter => chapter !== value);

    setSelectedChapters(updatedChapters);
    setFormData(prev => ({ ...prev, chapter: updatedChapters }));
  };



  // Academic form
  const renderAcademicForm = () => (
    <View style={styles.inputContainer}>
      <View style={styles.pickerWrapper}>

        <Picker
          selectedValue={formData.grade}
          onValueChange={(itemValue) => handleChange('grade', itemValue)}
          style={styles.picker}>
          <Picker.Item label="Select Grade" value="" />
          {grade.map((g, index) => (
            <Picker.Item key={index} value={g.toString()} label={`Grade ${g}`} />
          ))}
        </Picker>
      </View>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formData.board}
          onValueChange={(itemValue) => handleChange('board', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Board" value="" />
          {boards.map((board) => (
            <Picker.Item key={board.id} value={board.name} label={board.name} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={formData.subject}
          onValueChange={(itemValue) => handleChange('subject', itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Subject" value="" />
          {subjects.map((subject) => (
            <Picker.Item key={subject.id} value={subject.name} label={subject.name} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.dropdownToggle}
        onPress={() => setDropdownVisible((prev) => !prev)}
      >
        {selectedChapters.length === 0 ? (
          <Text style={styles.placeholder}>Select Chapters</Text>
        ) : (
          <Text style={styles.selectedText}>
            {selectedChapters.join(", ")}
          </Text>
        )}
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <View style={styles.dropdown}>
          {/* Clear Selection */}
          <TouchableOpacity
            onPress={() => setSelectedChapters([])}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>Clear Selection</Text>
          </TouchableOpacity>

          {/* Chapters List */}
          <FlatList
            data={chapters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.chapterItem}
                onPress={() => handleChapterSelect({ target: { value: item.name, checked: !selectedChapters.includes(item.name) } })}
              >
                <Text style={styles.chapterText}>
                  {selectedChapters.includes(item.name) ? "☑" : "☐"} {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />

        </View>
      )}
      <TouchableOpacity style={styles.nextButton} onPress={validateAndProceed}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  // Question Types form
  const renderQuestionTypesForm = () => {
    // Function to calculate total marks based on form data
    const calculateTotalMarks = (updatedFormData) => {
      const total =
        (parseInt(updatedFormData.choose || 0) * parseInt(updatedFormData.marks_choose || 0)) +
        (parseInt(updatedFormData.blanks || 0) * parseInt(updatedFormData.marks_blanks || 0)) +
        (parseInt(updatedFormData.question || 0) * parseInt(updatedFormData.marks_question || 0)) +
        (parseInt(updatedFormData.matchfollowing || 0) * parseInt(updatedFormData.marks_match || 0));
      return total;
    };

    // Handle input change and update formData with calculated total marks
    const handleInputChange = (field, value) => {
      const updatedFormData = { ...formData, [field]: value };
      const updatedTotalMarks = calculateTotalMarks(updatedFormData);
      setFormData({ ...updatedFormData, total_marks: updatedTotalMarks });
    };

    const generateQuestionTypes = () => {
      return [
        { count: formData.choose, marks: formData.marks_choose },
        { count: formData.blanks, marks: formData.marks_blanks },
        { count: formData.question, marks: formData.marks_question },
        { count: formData.matchfollowing, marks: formData.marks_match },
      ];
    };

    // Display the form and the questionTypes array
    return (
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text>Number of Choose Correct Questions</Text>
          <TextInput
            style={[styles.input, styles.inputWithBorder]}
            value={formData.choose}
            onChangeText={(text) => handleInputChange('choose', text)}
            keyboardType="numeric"
          />
          <Text>Marks per Choose Correct Question</Text>
          <TextInput
            style={[styles.input, styles.inputWithBorder]}
            value={formData.marks_choose}
            onChangeText={(text) => handleInputChange('marks_choose', text)}
            keyboardType="numeric"
          />

          <Text>Number of Fill-in-the-Blanks Questions</Text>
          <TextInput
            style={[styles.input, styles.inputWithBorder]}
            value={formData.blanks}
            onChangeText={(text) => handleInputChange('blanks', text)}
            keyboardType="numeric"
          />
          <Text>Marks per Fill-in-the-Blanks Question</Text>
          <TextInput
            style={[styles.input, styles.inputWithBorder]}
            value={formData.marks_blanks}
            onChangeText={(text) => handleInputChange('marks_blanks', text)}
            keyboardType="numeric"
          />

          <Text>Number of Short Answer Questions</Text>
          <TextInput
            style={[styles.input, styles.inputWithBorder]}
            value={formData.question}
            onChangeText={(text) => handleInputChange('question', text)}
            keyboardType="numeric"
          />
          <Text>Marks per Short Answer Question</Text>
          <TextInput
            style={[styles.input, styles.inputWithBorder]}
            value={formData.marks_question}
            onChangeText={(text) => handleInputChange('marks_question', text)}
            keyboardType="numeric"
          />

          <Text>Number of Match-the-Following Questions</Text>
          <TextInput
            style={[styles.input, styles.inputWithBorder]}
            value={formData.matchfollowing}
            onChangeText={(text) => handleInputChange('matchfollowing', text)}
            keyboardType="numeric"
          />
          <Text>Marks per Match-the-Following Question</Text>
          <TextInput
            style={[styles.input, styles.inputWithBorder]}
            value={formData.marks_match}
            onChangeText={(text) => handleInputChange('marks_match', text)}
            keyboardType="numeric"
          />

          {/* Additional inputs omitted for brevity */}

          <Text>Total Marks (calculated):</Text>
          <TextInput
            style={[styles.input, styles.inputWithBorder]}
            value={formData.total_marks.toString()}
            editable={false}
          />

          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => setActiveTab('Academic')}
              style={styles.buttonSecondary}
            >
              <Text style={styles.buttonTextSecondary}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={validateAndProceed}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View>
          <Text>Question Types:</Text>
          <Text>{JSON.stringify(generateQuestionTypes(), null, 2)}</Text>
        </View> */}

      </ScrollView>
    );
  };



  // Time Limits form
  const renderTimeLimitsForm = () => (
    <View style={styles.inputContainer}>
      <Text>Time Limit (minutes)</Text>
      <TextInput
        style={[styles.input, styles.inputWithBorder]}
        value={formData.timeLimit}
        onChangeText={(text) => setFormData({ ...formData, timeLimit: text })}
      />
      <Text>Exam Validity (days)</Text>
      <TextInput
        style={[styles.input, styles.inputWithBorder]}
        value={formData.validity}
        onChangeText={(text) => setFormData({ ...formData, validity: text })}
      />
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setActiveTab('Question Types')}
          style={styles.buttonSecondary}
        >
          <Text style={styles.buttonTextSecondary}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={validateAndProceed} style={styles.button}>
          <Text style={styles.buttonText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Assessment Summary</Text>

            <ScrollView style={styles.scrollView}>
              {Object.entries(formData).map(([key, value]) => (
                <Text key={key} style={styles.modalText}>
                  <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1')}: </Text>
                  {value || 'N/A'}
                </Text>
              ))}
            </ScrollView>
            <TouchableOpacity style={{ backgroundColor: 'green', marginBottom: 10, padding: 10, borderRadius: 4 }} onPress={handleAssessmentSubmit}>
              <Text style={{ textAlign: 'center', color: 'white' }}>Submit</Text>
            </TouchableOpacity>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>




      <View style={styles.tabContainer}>
        <Text
          style={[styles.tab, activeTab === 'Academic' && styles.activeTab]}
          onPress={() => setActiveTab('Academic')}
        >
          Academic
        </Text>
        <Text
          style={[styles.tab, activeTab === 'Question Types' && styles.activeTab]}
          onPress={validateAndProceed}
        >
          Question Types
        </Text>
        <Text
          style={[styles.tab, activeTab === 'Time Limits' && styles.activeTab]}
          onPress={validateAndProceed}
        >
          Time Limits
        </Text>
      </View>

      <Text style={styles.title}>Generate Assessment</Text>
      {activeTab === 'Academic' && renderAcademicForm()}
      {activeTab === 'Question Types' && renderQuestionTypesForm()}
      {activeTab === 'Time Limits' && renderTimeLimitsForm()}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    color: '#888',
    paddingBottom: 5,  // Adjust the gap between text and underline
    borderBottomWidth: 2,  // Underline thickness
    borderBottomColor: '#888',  // Underline color
  },
  activeTab: {
    color: '#1e88e5',
    fontWeight: 'bold',
    borderBottomColor: '#1e88e5',  // Active tab underline color
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
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

  dropdown: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    elevation: 5, // Adds a shadow effect for Android
    shadowColor: '#000', // Adds a shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    maxHeight: 200, // Limit the dropdown height
  },
  clearButton: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  clearText: {
    color: '#ff3333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  chapterItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chapterText: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#aaa',
    fontSize: 16,
  },
  selectedText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownToggle: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop:8
  },
  nextButton: {
    backgroundColor: '#004aad',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 30
  },
  button: {
    backgroundColor: '#004aad',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputWithBorder: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginTop: 5,
  },
  inputHalf: {
    width: '90%',
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 20
  },
  buttonSecondary: {
    backgroundColor: '#ccc',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '48%', // Same width as the primary button
  },
  buttonTextSecondary: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: 600,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scrollView: {
    maxHeight: 600,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
});
