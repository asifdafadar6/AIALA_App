import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  Switch,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { router, useRouter } from 'expo-router';
import { useContext } from 'react';
import { MyContext } from '../../components/provider/contextApi';

export default function SignIn() {
  const { existingUser, login } = useContext(MyContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const validateForm = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const loginPayload = { email, password };
      await login(loginPayload);
      if (existingUser) {
        if (existingUser.usertype === 'pending') {
          router.push('(auth)/Questionnaire');
        } else if (existingUser.usertype === 'teacher') {
          router.replace('(drawer)');
        } else if (existingUser.usertype === 'student') {
          router.replace('(drawerst)');
        }
      } else {
        console.error('No existing user found');
        router.replace('(auth)');
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Login Error", 'User Not Found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        {/* Logo */}
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Title */}
          <Text style={styles.title}>Sign In to Aiala</Text>

          {/* Email Input */}
          <Text style={styles.label}>Enter your email ID</Text>
          <TextInput
            placeholder="Enter your email ID"
            value={email}
            onChangeText={(text) => {
              setEmailError('');
              setEmail(text);
            }}
            style={[
              styles.input,
              { borderColor: emailError ? 'red' : 'blue' },
            ]}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={(text) => {
              setPasswordError('');
              setPassword(text);
            }}
            style={[
              styles.input,
              { borderColor: passwordError ? 'red' : 'blue' },
            ]}
          />
          {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

          {/* Forget Password */}
          <TouchableOpacity onPress={() => console.log('Forgot Password')} style={styles.forgotPassword}>
            <Text style={styles.link}>Forget Password?</Text>
          </TouchableOpacity>

          {/* Remember Me */}
          <View style={styles.rememberMeContainer}>
            <Text style={styles.label}>Remember me</Text>
            <Switch
              value={isEnabled}
              onValueChange={toggleSwitch}
              thumbColor={isEnabled ? 'blue' : 'gray'}
              trackColor={{ false: '#d3d3d3', true: '#81b0ff' }}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginText}>LOGIN</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <Text style={styles.divider}>You can also login with</Text>

          {/* Social Media Icons */}
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/FbLogo.png')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/Google.jpeg')}
                style={styles.socialIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <Text style={styles.footerText}>
            Not registered yet?{' '}
            <Text
              style={styles.link}
              onPress={() => router.push('(auth)/SignUp')}>
              Sign up!
            </Text>
          </Text>
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
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    marginTop: 16,
    width: 150,
    height: 70,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    marginTop: 32,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1f2937',
  },
  label: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 24,
    borderWidth: 1,
    padding: 12,
    marginBottom: 8,
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginBottom: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  link: {
    color: '#3b82f6',
    fontWeight: '600',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    fontWeight: '600',
  },
  divider: {
    textAlign: 'center',
    color: '#9ca3af',
    marginVertical: 16,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  socialIcon: {
    marginHorizontal: 8,
    width: 30,
    height: 30,
  },
  footerText: {
    textAlign: 'center',
    color: '#9ca3af',
  },
  cloudImage: {
    width: Dimensions.get('window').width,
    height: 135,
    position: 'absolute',
    bottom: 0,
  },
});
