import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import DismissKeyboard from "@/components/DismissKeyboard";

export default function GoalTimelineScreen() {
  const router = useRouter();
  const { setUserData, userData } = useOnboardingStore();
  const [selectedTimeline, setSelectedTimeline] = useState<string>("");

  const timelineOptions = [
    "3 Months",
    "6 Months",
    "9 Months",
    "12 Months"
  ];

  const handleNext = () => {
    setUserData({ goalTimeline: selectedTimeline });
    router.push("/onboarding/screen8"); // Adjust this to your next screen
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Almost done</Text>
          <ProgressBar currentScreen={7} totalScreens={8} />
        </View>

        <Text style={styles.subtitle}>How fast you want to reach your goal?</Text>

        <View style={styles.optionsContainer}>
          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.optionItem,
                selectedTimeline === "3 Months" && styles.selectedOption
              ]}
              onPress={() => setSelectedTimeline("3 Months")}
            >
              <Text style={styles.optionText}>3 Months</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionItem,
                selectedTimeline === "6 Months" && styles.selectedOption
              ]}
              onPress={() => setSelectedTimeline("6 Months")}
            >
              <Text style={styles.optionText}>6 Months</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={[
                styles.optionItem,
                selectedTimeline === "9 Months" && styles.selectedOption
              ]}
              onPress={() => setSelectedTimeline("9 Months")}
            >
              <Text style={styles.optionText}>9 Months</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionItem,
                selectedTimeline === "12 Months" && styles.selectedOption
              ]}
              onPress={() => setSelectedTimeline("12 Months")}
            >
              <Text style={styles.optionText}>12 Months</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, !selectedTimeline && styles.disabledButton]}
            onPress={handleNext}
            disabled={!selectedTimeline}
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
  optionsContainer: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  optionItem: {
    width: '48%',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: '#000',
    backgroundColor: '#f5f5f5',
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