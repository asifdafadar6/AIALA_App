import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getAllActivity } from '../../components/provider/assistent_api';
import { MyContext } from '../../components/provider/contextApi';
import { router } from 'expo-router';
import { Picker } from "@react-native-picker/picker";

export default function ActivityPlanner() {
  const { existingUser, grade = [] } = useContext(MyContext);
  const [activityPlans, setActivityPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = [
    { label: 'All', value: 'all' },
    { label: 'Biology', value: 'Biology' },
    { label: 'Physics', value: 'Physics' },
    { label: 'English', value: 'English' },
  ];

  useEffect(() => {
    fetchAllActivity();
  }, [existingUser]);

  const fetchAllActivity = async (grade = 'all', subject = 'all') => {
    setLoading(true);
    try {
      const response = await getAllActivity(grade, subject, existingUser.username);
      setActivityPlans(response);
    } catch (error) {
      console.error('Error fetching activity plans:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.header}>Welcome</Text>
      <Text style={{ textAlign: 'center' }}>To The Activity Planner! 🌟</Text>

      {/* Dropdown Section */}
      <View style={styles.filterSection}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Class</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedGrade}
              onValueChange={(itemValue) => setSelectedGrade(itemValue)}
              style={styles.picker}
            >
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
              selectedValue={selectedSubject}
              onValueChange={(itemValue) => setSelectedSubject(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Subject" value="" />
              {subjects.map((subject, index) => (
                <Picker.Item key={index} label={subject.label} value={subject.value} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      {/* Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.applyFilterButton}
          onPress={() => fetchAllActivity(selectedGrade, selectedSubject)}
        >
          <Text style={styles.buttonText}>Apply Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createLessonButton}
          onPress={() => { router.push('(main)/ActivityGenerator'); }}
        >
          <Text style={styles.lessonText}>Create Activity</Text>
        </TouchableOpacity>
      </View>

      {/* No Activity Plans Section */}
      <View style={styles.noPlansContainer}>
        <Text style={styles.noPlansText}>No Activity Plans Found</Text>
        <TouchableOpacity style={styles.loadMoreButton}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      </View>

      {/* Guidance Section */}
      <View style={styles.guidanceContainer}>
        <Text style={{ fontSize: 18 }}>Ready to plan your next activity?</Text>
        <Text style={styles.guidanceText}>
          Plan and manage your activities with ease. Start creating now!
        </Text>
        <Image
          source={require('../../assets/images/ActivityPlanner.jpg')}
          style={styles.guidanceImage}
        />
        <TouchableOpacity
          style={styles.createLesson}
          onPress={() => { router.push('(main)/ActivityGenerator'); }}
        >
          <Text style={[styles.loadMoreText, { color: 'white' }]}>Create Activity</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  applyFilterButton: {
    padding: 10,
    backgroundColor: '#234782',
    borderRadius: 5
  },
  createLessonButton: {
    padding: 10,
    backgroundColor: '#234782',
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  lessonText: {
    color: '#fff',
    textAlign: 'center'
  },

  noPlansContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  noPlansText: {
    fontSize: 16,
    color: '#888'
  },
  loadMoreButton: {
    marginTop: 10,
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#234782',
    width: '100%',
    marginBottom:20,
  },
  loadMoreText: {
    color: '#234782',
    fontSize: 16,
    textAlign: 'center',
  },

  guidanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  guidanceText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 12,
  },
  guidanceImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
  },
  createLesson: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#234782',
    borderRadius: 5,
    width: '100%',
  },
});
