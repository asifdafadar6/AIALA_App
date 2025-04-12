import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { getAssessmentDetails, getPendingAssessments } from '../../../components/provider/students_api';
import { MyContext } from '../../../components/provider/contextApi';
import Feather from 'react-native-vector-icons/Feather';


export default function PendingTest1() {
  const { existingUser } = useContext(MyContext)

  const [assessmentDetails, setAssessmentDetails] = useState([]);
  const [pendingAssessment, setPendingAssessment] = useState([]);

  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentCreditsIndex, setCurrentCreditsIndex] = useState(0);


  const fetchGetPendingAssessments = async () => {
    try {

      const response = await getPendingAssessments(existingUser.username);
      setPendingAssessment(response);
    } catch (error) {
      console.log("Dashboard error", error);
    }
  };

  const fetchGetAssessmentDetails = async () => {
    try {

      const response = await getAssessmentDetails(existingUser.username);
      setAssessmentDetails(response);

    } catch (error) {
      console.log("Dashboard error", error);
    }
  };


  useEffect(() => {
    fetchGetPendingAssessments(),
      fetchGetAssessmentDetails()
  }, [])



  const handleNextSubject = () => {
    setCurrentSubjectIndex((prevIndex) =>
      prevIndex < assessmentDetails.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousCredits = () => {
    setCurrentCreditsIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNextCredits = () => {
    setCurrentCreditsIndex((prevIndex) =>
      prevIndex < assessmentDetails.length - 1 ? prevIndex + 1 : prevIndex
    );
  };


  const currentAssessment = assessmentDetails[currentSubjectIndex] || {};
  const currentCredits = assessmentDetails[currentCreditsIndex] || {};


  return (
    <>
      <View style={styles.pendingSection}>
        <Text style={styles.sectionTitle}>Pending Tests</Text>
        <Text style={styles.pendingSubject}>Web Development</Text>
        <Text style={styles.pendingCount}>Total Available: {pendingAssessment.length}</Text>
        <TouchableOpacity style={styles.creditFirstButton}>
          <AntDesign name="calendar" size={24} color="#fdd835" />
          <Text style={styles.creditButtonText}>
            {' '}
            Upcoming assignments and tests
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pendingSection}>
        <Text style={styles.sectionTitle}>Total Credits</Text>
        <Text style={styles.pendingSubject}>{currentCredits.subject || "Not Available"}: {""}</Text>
        <Text style={styles.pendingCount}>
          {currentCredits.subject || "Not Available"}: {""}
          {currentCredits.total_score || "0"} / {currentCredits.total_marks || "0"}
        </Text>
        <TouchableOpacity style={styles.creditButton}>
          <AntDesign name="star" size={24} color="#43a047" />
          <Text style={styles.creditButtonText}>
             Credit earned
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 16 }}>
          <TouchableOpacity
            onPress={handlePreviousCredits}
            disabled={currentCreditsIndex === 0}
            style={{ paddingHorizontal: 16, paddingVertical: 8 }}
          >
            <Feather
              name="arrow-left-circle"
              size={28}
              color={currentCreditsIndex === 0 ? 'gray' : 'black'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNextCredits}
            disabled={currentCreditsIndex === assessmentDetails.length - 1}
            style={{ paddingHorizontal: 16, paddingVertical: 8 }}
          >
            <Feather
              name="arrow-right-circle"
              size={28}
              color={currentCreditsIndex === assessmentDetails.length - 1 ? 'gray' : 'black'}
            />
          </TouchableOpacity>
        </View>

      </View>
    </>
  );
}

const styles = {
  pendingSection: {
    padding: 20,
    margin: 16,
    marginHorizontal: 0,
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    alignItems: 'left',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'left'
  },
  pendingSubject: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 4,
    bottom: 12
  },
  pendingCount: {
    fontSize: 14,
    color: '#777',
    marginBottom: 12,
    bottom: 5
  },
  creditButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#d5ecd5',
    flexDirection:'row',
    alignItems:'center'
  },
  creditFirstButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#fff9c4',
    flexDirection: 'row',
    alignItems: 'center',
  },
  creditButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#777',
    marginLeft: 5,

  },
  credittestButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#ffffb1',
  },
};

