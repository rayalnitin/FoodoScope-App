import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import DismissKeyboard from "@/components/DismissKeyboard";

export default function PhysicalStatsScreen() {
  const router = useRouter();
  const { setUserData, setIsOnboarded, userData } = useOnboardingStore();
  const [height, setHeight] = useState(userData.height || "");
  const [weight, setWeight] = useState(userData.weight || "");
  const [goalWeight, setGoalWeight] = useState(userData.goalWeight || "");

  const handleNext = () => {
    setUserData({ height, weight, goalWeight });
    router.push("/onboarding/screen5");
  };

  return (
    <DismissKeyboard>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>You</Text>
        <ProgressBar currentScreen={4} totalScreens={8} />
      </View>
      
      <Text style={styles.subtitle}>Tell us about yourself</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Height</Text>
        <View style={styles.unitInputContainer}>
          <TextInput
            style={styles.unitInput}
            placeholder="Enter your height"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <Text style={styles.unitLabel}>Cm</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Weight</Text>
        <View style={styles.unitInputContainer}>
          <TextInput
            style={styles.unitInput}
            placeholder="Enter your weight"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <Text style={styles.unitLabel}>Kg</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Goal Weight</Text>
        <View style={styles.unitInputContainer}>
          <TextInput
            style={styles.unitInput}
            placeholder="Enter your goal weight"
            value={goalWeight}
            onChangeText={setGoalWeight}
            keyboardType="numeric"
          />
          <Text style={styles.unitLabel}>Kg</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, (!height || !weight || !goalWeight) && styles.disabledButton]}
          onPress={handleNext}
          disabled={!height || !weight || !goalWeight}
        >
          <Text style={styles.buttonText}>Complete</Text>
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
  unitInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  unitInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  unitLabel: {
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#666',
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