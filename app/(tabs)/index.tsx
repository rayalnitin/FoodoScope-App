import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import Header from '/home/saurav/Desktop/android_dev/my-app/components/header';
import SignupForm from '/home/saurav/Desktop/android_dev/my-app/components/signupform';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Header />
      <SignupForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});