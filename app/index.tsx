import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../stores/authStore";
import { useOnboardingStore } from "../stores/onboardingStore";

export default function Index() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { isOnboarded } = useOnboardingStore();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Prevent navigation if already navigating
    if (isNavigating) return;

    const handleNavigation = async () => {
      setIsNavigating(true);
      try {
        if (!isOnboarded) {
          router.replace("/onboarding/screen1");
          return;
        }

        if (!isAuthenticated) {
          router.replace("/auth/login");
          return;
        }
      } catch (error) {
        console.error("Navigation error:", error);
      } finally {
        setIsNavigating(false);
      }
    };

    // Small delay to ensure app is ready for navigation
    const timer = setTimeout(() => {
      handleNavigation();
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isOnboarded, router, isNavigating]);

  // Loading state while checking authentication
  if (isNavigating || (!isAuthenticated && !isOnboarded)) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // If user is authenticated and onboarded, show the home screen
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back, {user?.name}!</Text>
      <Text style={styles.subtitle}>FoodScope Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your FoodScope Journey</Text>
        <Text style={styles.cardContent}>
          Your personalized food and fitness journey begins here.
          Access all features and start tracking your progress.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/dashboard" as any)}
      >
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 24,
    width: "100%",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  cardContent: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
