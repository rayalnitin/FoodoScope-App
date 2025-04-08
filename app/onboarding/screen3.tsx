import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import DismissKeyboard from "@/components/DismissKeyboard";
import { dismiss } from "expo-router/build/global-state/routing";

export default function BasicInfoScreen() {
  const router = useRouter();
  const { setUserData, userData } = useOnboardingStore();
  const [gender, setGender] = useState(userData.gender || "");
  const [age, setAge] = useState(userData.age || "");
  const [location, setLocation] = useState(userData.location || "");

  const handleNext = () => {
    setUserData({ gender, age, location });
    router.push("/onboarding/screen4");
  };

  return (
    <DismissKeyboard>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>You</Text>
        <ProgressBar currentScreen={3} totalScreens={8} />
      </View>
      
      <Text style={styles.subtitle}>Tell us about yourself</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Select your gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'Male' && styles.selectedGender]}
            onPress={() => setGender('Male')}
          >
            <Text style={gender === 'Male' ? styles.selectedGenderText : styles.genderText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'Female' && styles.selectedGender]}
            onPress={() => setGender('Female')}
          >
            <Text style={gender === 'Female' ? styles.selectedGenderText : styles.genderText}>Female</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Your age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Where do you live?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your state"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, (!gender || !age || !location) && styles.disabledButton]}
          onPress={handleNext}
          disabled={!gender || !age || !location}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  genderButton: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedGender: {
    borderColor: '#000',
    backgroundColor: '#000',
  },
  genderText: {
    fontSize: 16,
    color: '#333',
  },
  selectedGenderText: {
    fontSize: 16,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingBottom: 24,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    width: '48%',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});