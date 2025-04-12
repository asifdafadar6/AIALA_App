import { View, Text, TextInput, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

export default function ResetPassword() {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });

  const handleResetPassword = () => {
    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = 'Please enter a new password.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (newPassword && confirmPassword !== newPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Password reset successfully');
    }
  };

  return (
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
        <Text style={styles.title}>Reset Password</Text>

        {/* New Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter new password</Text>
          <TextInput
            placeholder="Enter new password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            style={[
              styles.input,
              { borderColor: errors.newPassword ? 'red' : '#ccc' },
            ]}
          />
          {errors.newPassword ? <Text style={styles.errorText}>{errors.newPassword}</Text> : null}
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm new password</Text>
          <TextInput
            placeholder="Confirm new password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={[
              styles.input,
              { borderColor: errors.confirmPassword ? 'red' : '#ccc' },
            ]}
          />
          {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
        </View>

        {/* Reset Password Button */}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>RESET PASSWORD</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        Have an Account?{' '}
        <Text
          style={styles.signInText}
          onPress={() => router.push('(auth)/SignIn')}
        >
          Sign in
        </Text>
      </Text>

      {/* Cloud Image */}
      <Image
        source={require('../../assets/images/Cloud.png')}
        style={styles.cloudImage}
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
  logo: {
    width: 150,
    height: 70,
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    width: '90%',
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#555',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    color: '#555',
    marginTop: 20,
  },
  signInText: {
    color: '#007BFF',
    fontWeight: '600',
  },
  cloudImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    bottom: 0,
    height: 180,
    resizeMode: 'cover',
  },
});
