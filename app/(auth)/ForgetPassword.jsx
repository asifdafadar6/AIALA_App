import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, StyleSheet } from 'react-native';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); 

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex validation
    return emailRegex.test(email);
  };

  const handleResetPassword = () => {
    if (!email.trim()) {
      setError('Please enter your email ID.');
    } else if (!validateEmail(email)) {
      setError('Please enter a valid email ID.');
    } else {
      setError('');
      alert('Password reset link sent to your email!');
      router.push('(auth)/ResetPassword');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Title */}
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Please enter your email, and we will send a link to reset your password
          </Text>

          {/* Email Input */}
          <Text style={styles.label}>Enter your email ID</Text>
          <TextInput
            placeholder="Enter your email ID"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[
              styles.input,
              { borderColor: error ? 'red' : 'blue' }, // Dynamic border color
            ]}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}

          {/* Reset Password Button */}
          <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
            <Text style={styles.resetButtonText}>RESET PASSWORD</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View>
          <Text style={styles.footerText}>
            Have an Account?{' '}
            <Text
              style={styles.signInText}
              onPress={() => {
                router.push('(auth)/SignIn');
              }}
            >
              Sign in
            </Text>
          </Text>
        </View>

        {/* Cloud Image */}
        <Image
          source={require('../../assets/images/Cloud.png')}
          style={styles.cloudImage}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginVertical: 20,
    width: 150,
    height: 70,
    position: 'relative',
    top: 20,
  },
  formContainer: {
    backgroundColor: '#f3f4f6', // Equivalent to gray-100 in Tailwind
    borderRadius: 15,
    width: '91.6%', // Equivalent to 11/12 in Tailwind
    height: '50%', // Approximation for h-2/4
    padding: 24,
    marginTop: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    marginTop: 16,
    textAlign: 'center',
    color: '#374151', // Equivalent to gray-800 in Tailwind
  },
  subtitle: {
    textAlign: 'center',
    color: '#6b7280', // Equivalent to gray-600 in Tailwind
    marginBottom: 24,
  },
  label: {
    color: '#374151', // Equivalent to gray-700 in Tailwind
    marginBottom: 8,
    marginTop: 24,
  },
  input: {
    backgroundColor: '#f3f4f6', // Equivalent to gray-100 in Tailwind
    borderRadius: 9999, // Rounded-full in Tailwind
    borderWidth: 1,
    padding: 16,
    marginBottom: 4,
  },
  errorText: {
    color: '#dc2626', // Equivalent to red-600 in Tailwind
    fontSize: 12,
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#2563eb', // Equivalent to blue-600 in Tailwind
    borderRadius: 9999,
    paddingVertical: 12,
    marginTop: 16,
  },
  resetButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
  },
  footerText: {
    textAlign: 'center',
    color: '#6b7280', // Equivalent to gray-600 in Tailwind
    marginTop: 40,
  },
  signInText: {
    color: '#2563eb', // Equivalent to blue-600 in Tailwind
    fontWeight: '600',
  },
  cloudImage: {
    position: 'relative',
    width: Dimensions.get('window').width,
    height: 150,
    resizeMode: 'cover',
  },
});
