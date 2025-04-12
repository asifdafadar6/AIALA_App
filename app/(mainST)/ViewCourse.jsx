import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const courses = [
  {
    id: '1',
    title: 'Data Science',
    institution: 'Coursera',
    rating: '4.8',
    students: '1200 Students',
    image: require('../../assets/images/datascience.png'),
  },
  {
    id: '2',
    title: 'Intro To AI',
    institution: 'edX',
    rating: '4.7',
    students: '950 Students',
    image: require('../../assets/images/ai.png'),
  },
  {
    id: '3',
    title: 'Web Dev Bootcamp',
    institution: 'Udemy',
    rating: '4.9',
    students: '1500 Students',
    image: require('../../assets/images/bootcamp.png'),
  },
  {
    id: '4',
    title: 'Machine Learning',
    institution: 'Coursera',
    rating: '4.6',
    students: '1100 Students',
    image: require('../../assets/images/ml.png'),
  },
  {
    id: '5',
    title: 'Graphic Design',
    institution: 'Skillshare',
    rating: '4.5',
    students: '800 Students',
    image: require('../../assets/images/ai.png'),
  },
  {
    id: '6',
    title: 'Business Analytics',
    institution: 'edX',
    rating: '4.7',
    students: '1000 Students',
    image: require('../../assets/images/ml.png'),
  },
  {
    id: '7',
    title: 'Python Programming',
    institution: 'Udemy',
    rating: '4.7',
    students: '1050 Students',
    image: require('../../assets/images/bootcamp.png'),
  },
];

export default function ViewCourse() {
  const renderCourse = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.institution}>{item.institution}</Text>
        <Text style={styles.details}>Rating: {item.rating}</Text>
        <Text style={styles.details}>{item.students}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Courses</Text>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 3, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000',
  },
  institution: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  details: {
    fontSize: 13,
    color: '#777',
  },
});
