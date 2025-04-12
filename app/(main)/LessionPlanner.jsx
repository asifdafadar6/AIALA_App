import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, Button, ScrollView } from 'react-native';
import { MyContext } from '../../components/provider/contextApi';
import { getAllLessonPlans } from '../../components/provider/assistent_api';
import { Picker } from "@react-native-picker/picker";
import Markdown from 'react-native-markdown-display';


export default function LessonPlanner() {
  const { existingUser, grade = [] } = useContext(MyContext);
  const [lessonPlans, setLessonPlans] = useState([]);
  const [filteredLessonPlans, setFilteredLessonPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    fetchLessonPlans();
  }, [existingUser]);

  const fetchLessonPlans = async () => {
    setLoading(true);
    try {
      const response = await getAllLessonPlans('all', 'all', existingUser.username);
      setLessonPlans(response.lesson_plans);
      console.log("lesson_plans", response);

      setFilteredLessonPlans(response.lesson_plans);
      setSelectedLesson(response.lesson_plans);

    } catch (error) {
      console.error('Error fetching lesson plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    let filteredPlans = lessonPlans;

    if (selectedGrade && selectedGrade !== 'all') {
      filteredPlans = filteredPlans.filter(lesson => lesson.grade === selectedGrade);
    }

    if (selectedSubject && selectedSubject !== 'all') {
      filteredPlans = filteredPlans.filter(lesson => lesson.subject === selectedSubject);
    }

    setFilteredLessonPlans(filteredPlans);
  };


  const renderLesson = ({ item }) => (
    <TouchableOpacity style={styles.touchable}
      onPress={() => {
        setSelectedLesson(item);
        setModalVisible(true);
      }}>
      <View style={styles.lessonItem}>
        <Image
          source={require('../../assets/images/Group2.png')}
          style={styles.lessonImage}
          resizeMode="contain"
        />
        <View style={styles.lessonDetails}>
          <Text style={styles.lessonSubject}>{item && item.subject}</Text>
          <Text style={styles.lessonTopic}>{item && item.topic}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={{flex:1,paddingBottom:50}}>
            <Text style={styles.modalTitle}>{selectedLesson && selectedLesson.subject}</Text>
            <Markdown >
              {selectedLesson && selectedLesson.lessonplan}
            </Markdown>
          </ScrollView>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>


      <FlatList
        data={filteredLessonPlans}
        renderItem={renderLesson}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subtitle}>To The Lesson Planner! 🎓</Text>

            {/* Dropdowns Section */}
            <View style={styles.filterSection}>

              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Class</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    style={styles.picker}>
                    <Picker.Item label="Select Class" value="" />
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label="9" value="9" />
                  </Picker>
                </View>
              </View>
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Subject</Text>
                <View style={styles.pickerWrapper}>
                  <Picker
                    style={styles.picker}>
                    <Picker.Item label="Select Subject" value="" />
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label="Biology" value="biology" />
                    <Picker.Item label="English" value="english" />
                  </Picker>
                </View>
              </View>
            </View>

            {/* Apply Filter Button */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
                <Text style={styles.buttonText}>Apply Filter</Text>
              </TouchableOpacity>

              {/* Create Lesson Button */}
              <TouchableOpacity style={styles.createButton}>
                <Text style={styles.buttonText}>Create Lesson</Text>
              </TouchableOpacity>
            </View>

          </View>
        }

        ListFooterComponent={
          <View style={styles.footer}>
            <TouchableOpacity style={styles.loadButton}>
              <Text style={styles.loadText}>Load More</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
              Ready to plan your next lesson? Plan and manage your lessons with ease. Start creating now!
            </Text>
            <Image source={require('../../assets/images/ActivityPlanner.jpg')} style={styles.footerImage} />
            <TouchableOpacity style={styles.footerButton}>
              <Text style={styles.buttonText}>Create Lesson</Text>
            </TouchableOpacity>
          </View>
        }
      />

    </>

  );
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  // Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalTopic: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  // Styled Close Button
  closeButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%'
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  // 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 20,
  },
  dropdownContainer: {
    marginBottom: 10,
    borderRadius: 10,
    padding: 4,
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
  dropdownWrapper: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray'
  },
  pickerStyle: {
    inputAndroid: {
      color: '#000',
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 0,
    },
    inputIOS: {
      color: '#000',
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,

  },
  filterButton: {
    padding: 10,
    backgroundColor: '#234782',
    borderRadius: 5
  },
  createButton: {
    padding: 10,
    backgroundColor: '#234782',
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

  touchable: {
    marginBottom: 10,
  },
  lessonItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,

  },
  lessonImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  lessonDetails: {
    justifyContent: 'center',
  },
  lessonSubject: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lessonTopic: {
    fontSize: 14,
    color: '#666',
  },

  loadButton: {
    marginTop: 10,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#234782',
    width: '100%',
    marginBottom: 20,
  },
  loadText: {
    color: '#234782',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    // backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  footerImage: {
    width: '100%',
    height: 180,
    alignSelf: 'center',
    marginBottom: 15,
    borderRadius: 8
  },
  footerButton: {
    backgroundColor: '#234782',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
});
