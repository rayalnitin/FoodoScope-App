import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import LoginForm from '/home/saurav/Desktop/android_dev/my-app/components/loginform';

const SignupForm = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  if (showLoginForm) {
    return <LoginForm onSignUpPress={() => setShowLoginForm(false)} />;
  }
  return (
    <View style={styles.formContainer}>
      
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Image
        source={require('/home/saurav/Desktop/android_dev/my-app/assets/images/WhatsApp Image 2025-03-29 at 4.07.32 PM.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.createAccountText}>Create an account</Text>
      <Text style={styles.startJourneyText}>Start your journey now</Text>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.countryCodeButton}>
          <Text style={styles.countryCodeText}>+91 ▼</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Phone number"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require('/home/saurav/Desktop/android_dev/my-app/assets/images/colourful-google-logo-on-white-background-free-vector.jpg')}
          style={styles.socialIcon}
          resizeMode="contain"
        />
        <Text style={styles.socialButtonText}>Sign up with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require('/home/saurav/Desktop/android_dev/my-app/assets/images/social-media-logo-design_23-2151296987.avif')}
          style={styles.socialIcon}
          resizeMode="contain"
        />
        <Text style={styles.socialButtonText}>Sign up with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialButton}>
        <Image
          source={require('/home/saurav/Desktop/android_dev/my-app/assets/images/8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpg')}
          style={styles.socialIcon}
          resizeMode="contain"
        />
        <Text style={styles.socialButtonText}>Sign up with Apple</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Already have an account?
        <Text
          style={styles.loginLink}
          onPress={() => setShowLoginForm(true)}
        >
          Log in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 200,
    height: 80,
    alignSelf: 'center',
    marginBottom: 20,
  },
  createAccountText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  startJourneyText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  countryCodeButton: {
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: '#555',
  },
  countryCodeText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    flex: 1,
    padding: 12,
    color: '#fff',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: '#888',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
  loginLink: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SignupForm;