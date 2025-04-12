import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Assessments() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/assessments.png')}
        style={styles.image}
      />
      <Text style={styles.text}>No Data</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555',
  },
});
 