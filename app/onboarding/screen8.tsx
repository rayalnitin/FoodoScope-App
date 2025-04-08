import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import ProgressBar from "@/components/ProgressBar";

export default function TermsConditionsScreen() {
  const router = useRouter();
  const { setUserData } = useOnboardingStore();
  const [agreed, setAgreed] = useState(false);

  const handleNext = () => {
    setUserData({ agreedToTerms: true });
    router.push("/onboarding/screen9"); // Adjust to your next screen
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Terms & Conditions</Text>
        <ProgressBar currentScreen={8} totalScreens={8} />
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.termItem}>
          1. Health Disclaimer – The app provides general guidance and is not a substitute for professional medical or nutritional advice.
        </Text>
        <Text style={styles.termItem}>
          2. Data Accuracy – Food and fitness data are sourced via third-party APIs and may not always be 100% accurate.
        </Text>
        <Text style={styles.termItem}>
          3. User Responsibility – You are responsible for logging accurate data and keeping your account secure.
        </Text>
        <Text style={styles.termItem}>
          4. Privacy & Data Usage – Personal data is collected and processed as per our Privacy Policy and may be shared with third-party APIs.
        </Text>
        <Text style={styles.termItem}>
          5. Subscriptions & Payments – Some features may require payment; fees are non-refundable unless required by law.
        </Text>
        <Text style={styles.termItem}>
          6. Prohibited Activities – Misuse, false data entry, or unauthorized API access may lead to account suspension.
        </Text>
        <Text style={styles.termItem}>
          7. Changes to Terms – We may update these terms, and continued use of the app signifies your acceptance.
        </Text>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={agreed}
            onValueChange={setAgreed}
            color={agreed ? "#000" : undefined}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>I agree to terms and conditions</Text>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !agreed && styles.disabledButton]}
          onPress={handleNext}
          disabled={!agreed}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 20,
  },
  termItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    lineHeight: 22,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  checkbox: {
    marginRight: 15,
    width: 22,
    height: 22,
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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