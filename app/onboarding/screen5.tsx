import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import ProgressBar from "@/components/ProgressBar";
import DismissKeyboard from "@/components/DismissKeyboard";

export default function HealthIssuesScreen() {
  const router = useRouter();
  const { setUserData, userData } = useOnboardingStore();
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  const healthIssues = [
    "Diabetes",
    "Hypertension",
    "Arthritis",
    "Cholesterol",
    "Sleep issues",
    "Thyroid",
    "None"
  ];

  const toggleIssue = (issue: string) => {
    if (selectedIssues.includes(issue)) {
      setSelectedIssues(selectedIssues.filter(item => item !== issue));
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };

  const handleNext = () => {
    setUserData({ healthIssues: selectedIssues });
    router.push("/onboarding/screen6");
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Health Issues</Text>
          <ProgressBar currentScreen={5} totalScreens={8} />
        </View>

        <Text style={styles.subtitle}>Do you have any health issues?</Text>

        <View style={styles.issuesContainer}>
          {healthIssues.map((issue, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.issueItem,
                selectedIssues.includes(issue) && styles.selectedIssue
              ]}
              onPress={() => toggleIssue(issue)}
            >
              <Checkbox
                value={selectedIssues.includes(issue)}
                onValueChange={() => toggleIssue(issue)}
                color={selectedIssues.includes(issue) ? "#000" : undefined}
                style={styles.checkbox}
              />
              <Text style={styles.issueText}>{issue}</Text>
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
            style={[styles.button, selectedIssues.length === 0 && styles.disabledButton]}
            onPress={handleNext}
            disabled={selectedIssues.length === 0}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  // Reuse the same styles from GoalsScreen with minor adjustments
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
  issuesContainer: {
    marginTop: 20,
  },
  issueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  selectedIssue: {
    borderColor: '#000',
    backgroundColor: '#f5f5f5',
  },
  checkbox: {
    marginRight: 15,
    width: 22,
    height: 22,
  },
  issueText: {
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