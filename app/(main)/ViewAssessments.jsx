import React from 'react';
import { ScrollView } from 'react-native';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const assessments = [
  {
    id: '1',
    image: require('../../assets/images/biology.jpg'), // Replace with your local image paths
    title: 'Biology Test',
    chapter: 'Respiration',
    totalMarks: 4,
    timeLimit: '60 Mins',
    expiry: '7 Days',
  },
  {
    id: '2',
    image: require('../../assets/images/physics.jpg'),
    title: 'Physics Test',
    chapter: 'Kinematics',
    totalMarks: 5,
    timeLimit: '45 Mins',
    expiry: '5 Days',
  },
  {
    id: '3',
    image: require('../../assets/images/chemistry.jpg'),
    title: 'Chemistry Test',
    chapter: 'Periodic Table',
    totalMarks: 6,
    timeLimit: '50 Mins',
    expiry: '5 Days',
  },
  {
    id: '4',
    image: require('../../assets/images/math.jpg'),
    title: 'Math Test',
    chapter: 'Algebra',
    totalMarks: 10,
    timeLimit: '90 Mins',
    expiry: '10 Days',
  },
  {
    id: '5',
    image: require('../../assets/images/english.jpg'),
    title: 'English Test',
    chapter: 'Grammar',
    totalMarks: 8,
    timeLimit: '75 Mins',
    expiry: '2 Days',
  },
];

export default function ViewAssessments() {
  
  const renderAssessment = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.details}>Chapter: {item.chapter}</Text>
        <Text style={styles.details}>Total Marks: {item.totalMarks}</Text>
        <Text style={styles.details}>
          Time Limit: {item.timeLimit}, Expiry: {item.expiry}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.header}>Available Assessments</Text>
      <FlatList
        data={assessments}
        renderItem={renderAssessment}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start Assessment</Text>
      </TouchableOpacity>  
      <Text style={styles.header2}>Available Student Assessments</Text>
      <FlatList
        data={assessments}
        renderItem={renderAssessment}
        keyExtractor={(item) => item.id}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity style={styles.button2}>
        <Text style={styles.buttonText}>Start Assessment</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#1F2937',
  },
  header2: {
    fontSize: 21,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#1F2937',
  },
  list: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  details: {
    fontSize: 14,
    color: '#4B5563',
    marginTop: 2,
  },
  button: {
    backgroundColor: '#24457c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    marginBottom:40
  },
  button2: {
    backgroundColor: '#24457c',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    marginBottom:80
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
