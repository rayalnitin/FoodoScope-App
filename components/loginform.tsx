import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
interface LoginFormProps {
    onSignUpPress: () => void;
  }
  
const LoginForm: React.FC<LoginFormProps> = ({ onSignUpPress }) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.welcomeText}>Welcome to</Text>
      <Image
        source={require('/home/saurav/Desktop/android_dev/my-app/assets/images/WhatsApp Image 2025-03-29 at 4.07.32 PM.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.loginTitle}>Log in to your account</Text>
      <Text style={styles.loginSubtitle}>Welcome back! Please enter your details.</Text>

      <Text style={styles.inputLabel}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your number"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.googleSignInButton}>
        <Image
          source={require('/home/saurav/Desktop/android_dev/my-app/assets/images/colourful-google-logo-on-white-background-free-vector.jpg')}
          style={styles.googleSignInIcon}
          resizeMode="contain"
        />
        <Text style={styles.googleSignInButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <Text style={styles.signUpText}>
        Don't have an account?
        <Text style={styles.signUpLink} onPress={onSignUpPress}>
          Sign up
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
  loginTitle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  loginSubtitle: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  inputLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  signInButton: {
    backgroundColor: '#888',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#aaa',
    textAlign: 'center',
    marginVertical: 16,
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  googleSignInIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  googleSignInButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  signUpText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: 20,
  },
  signUpLink: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginForm;