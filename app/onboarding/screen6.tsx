import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import ProgressBar from "@/components/ProgressBar";
import DismissKeyboard from "@/components/DismissKeyboard";

export default function DietaryPreferencesScreen() {
  const router = useRouter();
  const { setUserData, userData } = useOnboardingStore();
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Lactose free",
    "Low fats",
    "High protein",
    "Low carbs",
    "None"
  ];

  const togglePreference = (preference: string) => {
    if (selectedDietary.includes(preference)) {
      setSelectedDietary(selectedDietary.filter(item => item !== preference));
    } else {
      // Handle "None" selection exclusively
      if (preference === "None") {
        setSelectedDietary(["None"]);
      } else {
        setSelectedDietary([
          ...selectedDietary.filter(item => item !== "None"),
          preference
        ]);
      }
    }
  };

  const handleNext = () => {
    setUserData({ dietaryPreferences: selectedDietary });
    router.push("/onboarding/screen7");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Dietary Preferences</Text>
          <ProgressBar currentScreen={6} totalScreens={8} />
        </View>

        <Text style={styles.subtitle}>What are your dietary preferences?</Text>

        <View style={styles.optionsContainer}>
          {dietaryOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionItem,
                selectedDietary.includes(option) && styles.selectedOption
              ]}
              onPress={() => togglePreference(option)}
            >
              <Checkbox
                value={selectedDietary.includes(option)}
                onValueChange={() => togglePreference(option)}
                color={selectedDietary.includes(option) ? "#000" : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, selectedDietary.length === 0 && styles.disabledButton]}
            onPress={handleNext}
            disabled={selectedDietary.length === 0}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboard>
  );
}

// Reuse the same styles from previous screens
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
  optionsContainer: {
    marginTop: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedOption: {
    borderColor: '#000',
    backgroundColor: '#f5f5f5',
  },
  checkbox: {
    marginRight: 15,
    width: 22,
    height: 22,
  },
  optionText: {
    fontSize: 16,
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