import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!email.trim()) {
      newErrors.email = 'Please enter your email ID.';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email ID.';
    }

    if (!password.trim()) {
      newErrors.password = 'Please enter your password.';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      alert('Sign Up successful!');
      router.push('(auth)/SignIn');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
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
          <Text style={styles.title}>Sign Up to Aiala</Text>

          {/* Full Name Input */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            style={[
              styles.input,
              { borderColor: errors.fullName ? 'red' : 'blue' },
            ]}
          />
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}

          {/* Email Input */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            placeholder="Enter your email address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[
              styles.input,
              { borderColor: errors.email ? 'red' : 'blue' },
            ]}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={[
              styles.input,
              { borderColor: errors.password ? 'red' : 'blue' },
            ]}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* Confirm Password Input */}
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            style={[
              styles.input,
              { borderColor: errors.confirmPassword ? 'red' : 'blue' },
            ]}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View>
            <Text style={styles.footerText}>
              Have an Account?{' '}
              <Text
                style={styles.signInLink}
                onPress={() => {
                  router.push('(auth)/SignIn');
                }}
              >
                Sign in
              </Text>
            </Text>
          </View>
        </View>

        {/* Cloud Image */}
        <ImageBackground
          source={require('../../assets/images/Cloud.png')}
          style={styles.cloudImage}
          resizeMode="cover"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    marginTop: 16,
    width: 150,
    height: 70,
  },
  formContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    width: '90%',
    padding: 24,
    marginTop: 40,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1f2937',
  },
  label: {
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 16,
  },
  signUpButton: {
    backgroundColor: '#2563eb',
    borderRadius: 24,
    paddingVertical: 12,
    marginTop: 16,
  },
  signUpButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 24,
  },
  signInLink: {
    color: '#2563eb',
    fontWeight: '600',
  },
  cloudImage: {
    width: Dimensions.get('window').width,
    height: 135,
    position: 'absolute',
    bottom: 0,
  },
});
