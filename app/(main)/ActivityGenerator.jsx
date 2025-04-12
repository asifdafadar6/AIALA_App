import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import { getBoards, getChapters, getGrades, getSubjects } from '../../components/provider/teachers_api';
import { generateActivity } from '../../components/provider/assistent_api';
import { navigate } from 'expo-router/build/global-state/routing';

export default function ActivityGenerator() {
  const sessionIds = uuid.v4();

  const [grades, setGrades] = useState([]);
  const [boards, setBoards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [formValues, setFormValues] = useState({
    activityName: '',
    grade: '',
    board: '',
    subject: '',
    chapter: '',
    description: '',
    sender: 'aa',
    sessionID: sessionIds,
    chatID: '12',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGrade();
  }, []);

  // Fetch grades
  const fetchGrade = async () => {
    setLoading(true);
    try {
      const response = await getGrades();
      console.log('Fetched Grades:', response);

      // Ensure grades is an array
      if (Array.isArray(response)) {
        setGrades(response); // Set grades if response is an array
      } else {
        console.warn('Grades response is not in the expected format:', response);
        setGrades([]); // Clear grades if response is invalid
      }
    } catch (error) {
      console.error('Error fetching grades:', error);
      setGrades([]); // Clear grades on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch boards based on selected grade
  const fetchBoards = async (selectedGrade) => {
    setLoading(true);
    try {
      const response = await getBoards(selectedGrade);
      
      // Debugging log: Check the response format
      console.log('Fetched Boards:', response);

      // Ensure boards is an array
      if (Array.isArray(response)) {
        setBoards(response); // Set boards if response is an array
      } else {
        console.warn('Boards response is not in the expected format:', response);
        setBoards([]); // Clear boards if response is invalid
      }
    } catch (error) {
      console.error('Error fetching boards:', error);
      setBoards([]); // Clear boards on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch subjects based on selected grade and board
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

  // Handle field changes and cascading updates
  const handleChange = async (name, value) => {
    const updatedValues = { ...formValues, [name]: value };

    if (name === 'grade') {
      updatedValues.board = '';
      updatedValues.subject = '';
      updatedValues.chapter = '';
      setBoards([]); // Clear boards when grade changes
      setSubjects([]); // Clear subjects when grade changes
      setChapters([]); // Clear chapters when grade changes
      if (value) await fetchBoards(value); // Fetch boards for the selected grade
    } else if (name === 'board') {
      updatedValues.subject = '';
      updatedValues.chapter = '';
      setSubjects([]); // Clear subjects when board changes
      setChapters([]); // Clear chapters when board changes
      if (value) await fetchSubjects(updatedValues.grade, value); // Fetch subjects for the selected grade and board
    } else if (name === 'subject') {
      updatedValues.chapter = '';
      setChapters([]); // Clear chapters when subject changes
      if (value) await fetchChapters(updatedValues.grade, updatedValues.board, value); // Fetch chapters for the selected grade, board, and subject
    }

    setFormValues(updatedValues);
  };

  // Submit the form
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await generateActivity(formValues);
      console.log("generateActivity",response);
      
      if (response) {

        // navigate('/ExpertActivityAssistant', {
        //   state: { activeData: response, formValues: formValues },
        // });
        console.warn("Done");
        
      }
    } catch (error) {
      console.error('Error generating activity:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log('Grades State:', grades);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Generate Your Activity</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Activity Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Give a name to your activity"
          value={formValues.activityName}
          onChangeText={(value) => handleChange('activityName', value)}
        />

        <View style={styles.row}>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Grade</Text>
            <Picker
              selectedValue={formValues.grade}
              onValueChange={(value) => handleChange('grade', value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Grade" value="" />
              {Array.isArray(grades) && grades.length > 0 ? (
                grades.map((g,index) => (
                  <Picker.Item key={index} label={g.name} value={g.id} />
                ))
              ) : (
                <Picker.Item label="No grades available" value="" />
              )}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Board</Text>
            <Picker
              selectedValue={formValues.board}
              onValueChange={(value) => handleChange('board', value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Board" value="" />
              {boards && boards.length > 0 ? (
                boards.map((board) => (
                  <Picker.Item key={board.id} label={board.name} value={board.id} />
                ))
              ) : (
                <Picker.Item label="No boards available" value="" />
              )}
            </Picker>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Subject</Text>
            <Picker
              selectedValue={formValues.subject}
              onValueChange={(value) => handleChange('subject', value)}
              style={styles.picker}
            >
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

          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Chapter</Text>
            <Picker
              selectedValue={formValues.chapter}
              onValueChange={(value) => handleChange('chapter', value)}
              style={styles.picker}
            >
              <Picker.Item label="Select Chapter" value="" />
              {chapters && chapters.length > 0 ? (
                chapters.map((chapter) => (
                  <Picker.Item key={chapter.id} label={chapter.name} value={chapter.id} />
                ))
              ) : (
                <Picker.Item label="No chapters available" value="" />
              )}
            </Picker>
          </View>
        </View>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Enter activity description"
          multiline
          value={formValues.description}
          onChangeText={(value) => handleChange('description', value)}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Generate Activity</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  topicInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flex: 1,
    marginRight: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  decorativeImageRight: {
    position: 'absolute',
    right: 0,
    top: 50,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  decorativeImageLeft: {
    position: 'absolute',
    left: 0,
    top: 50,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
