import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { MaterialIcons } from '@expo/vector-icons';
export default function PreparingPlanScreen() {
  const router = useRouter();
  const { setIsOnboarded, currentUserId } = useOnboardingStore();
  
  useEffect(() => {
    if (!currentUserId) return;
  
    const completeOnboarding = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Mark user as onboarded
        setIsOnboarded(currentUserId, true);
        console.log(`Setting user ${currentUserId} as onboarded`);
        
        // Use setTimeout to ensure state is updated before navigation
        setTimeout(() => {
          router.replace("/screens/dashboard");
        }, 100);
      } catch (error) {
        console.error("Error in onboarding completion:", error);
      }
    };
  
    completeOnboarding();
  }, [currentUserId]);
  
  return (
    <View style={styles.container}>
      <MaterialIcons name="check-circle" size={120} color="#4CAF50" style={styles.checkmark} />
      <Text style={styles.title}>Preparing your plan...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  checkmark: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});