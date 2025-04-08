import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import ProgressBar from "@/components/ProgressBar";
import DismissKeyboard from "@/components/DismissKeyboard";

export default function GoalsScreen() {
  const router = useRouter();
  const { setUserData, userData } = useOnboardingStore();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    "Lose weight",
    "Gain muscle",
    "Improve health",
    "Eat more balanced",
    "Manage condition",
    "Boost energy",
    "Other"
  ];

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(item => item !== goal));
    } else {
      if (selectedGoals.length < 3) {
        setSelectedGoals([...selectedGoals, goal]);
      }
    }
  };

  const handleNext = () => {
    setUserData({ goals: selectedGoals });
    router.push("/onboarding/screen3");
  };

  return (
    <DismissKeyboard>
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Goals</Text>
        <ProgressBar currentScreen={2} totalScreens={8} />
      </View>
      
      <Text style={styles.subtitle}>Select up to 3 most important goals</Text>
      
      <View style={styles.goalsContainer}>
        {goals.map((goal, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.goalItem,
              selectedGoals.includes(goal) && styles.selectedGoal
            ]}
            onPress={() => toggleGoal(goal)}
          >
            <Checkbox
              value={selectedGoals.includes(goal)}
              onValueChange={() => toggleGoal(goal)}
              color={selectedGoals.includes(goal) ? "#000" : undefined}
              style={styles.checkbox}
            />
            <Text style={styles.goalText}>{goal}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, selectedGoals.length === 0 && styles.disabledButton]}
          onPress={handleNext}
          disabled={selectedGoals.length === 0}
        >
          <Text style={styles.buttonText}>
            {selectedGoals.length > 0 ? `Next (${selectedGoals.length}/3)` : "Next"}
          </Text>
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
  goalsContainer: {
    marginTop: 20,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedGoal: {
    borderColor: '#000',
    backgroundColor: '#f5f5f5',
  },
  checkbox: {
    marginRight: 15,
    width: 22,
    height: 22,
  },
  goalText: {
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