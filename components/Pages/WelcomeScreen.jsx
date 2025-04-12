import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Corrected import for the router
import { MyContext } from '../provider/contextApi';

export default function WelcomeScreen() {
  const { existingUser } = useContext(MyContext)
  console.log("user", existingUser);

  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        // Simulate a splash screen delay
        await new Promise((resolve) => setTimeout(resolve, 3000));

        if (existingUser && existingUser?.usertype === 'teacher') {
          router.push('(drawer)');
        } else if (existingUser?.usertype === 'student') {
          router.push('(drawerst)');
        } else if (existingUser?.usertype === 'pending') {
          router.push('(auth)/Questionnaire');
        } else {
          router.push('(auth)/SignIn');
        }
      } catch (error) {
        console.error("Error during redirection:", error);
      }
    };

    if (!existingUser || !existingUser.usertype) {
      redirectUser();
    }
  }, [existingUser, router]);

  return (
    <View style={styles.container}>
      {/* Flower icon on the top-left */}
      <Image
        source={require('../../assets/images/Flower.png')}
        style={styles.flowerIcon}
        resizeMode="contain"
      />

      {/* Logo in the center */}
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Plane icon */}
      <Image
        source={require('../../assets/images/PlanRight.png')}
        style={styles.planeIcon}
        resizeMode="contain"
      />

      {/* Cloud at the bottom */}
      <Image
        source={require('../../assets/images/Cloud.png')}
        style={styles.cloud}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flowerIcon: {
    position: 'absolute',
    top: 50,
    left: 30,
    width: 70,
    height: 70,
  },
  logo: {
    position: 'absolute',
    top: 300,
    width: 200,
    height: 100,
  },
  planeIcon: {
    position: 'relative',
    top: 145,
    left: 120,
    width: 350,
    height: 250,
    transform: [{ rotate: '-13deg' }],
  },
  cloud: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    height: 170,
  },
});
