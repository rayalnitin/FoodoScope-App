import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useOnboardingStore } from "../../stores/onboardingStore";
import { MaterialIcons } from '@expo/vector-icons';

export default function PreparingPlanScreen() {
  const router = useRouter();
  const { setUserData, setIsOnboarded, height, weight, goalWeight } = useOnboardingStore();

  useEffect(() => {
    const handleComplete = () => {
      setUserData({ height, weight, goalWeight });
      setIsOnboarded(true);
      router.replace("/");
    };

    // Simulate preparation time (2 seconds)
    const timer = setTimeout(handleComplete, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
        <MaterialIcons name="check-circle" size={120} color="#4CAF50" style={styles.checkmark} />
        <Text style={styles.title}>Preparing your plan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.6)',
  },
});