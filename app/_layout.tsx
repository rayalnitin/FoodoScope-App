// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }
// app/_layout.tsx
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuthStore } from '../stores/authStore';
import { useOnboardingStore } from '../stores/onboardingStore';

/**
 * Root layout component that ensures the app is ready before rendering
 */
export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const authStore = useAuthStore();
  const onboardingStore = useOnboardingStore();

  // Wait for hydration to complete before rendering anything
  useEffect(() => {
    const prepare = async () => {
      try {
        // Wait a moment to ensure Zustand stores are hydrated
        await new Promise(resolve => setTimeout(resolve, 200));

        // Debug store state
        console.log('Auth store hydrated:', {
          isAuthenticated: authStore.isAuthenticated,
          hasUser: !!authStore.user
        });

        console.log('Onboarding store hydrated:', {
          isOnboarded: onboardingStore.isOnboarded,
          hasName: !!onboardingStore.userData.name
        });
      } catch (error) {
        console.error('Error preparing app:', error);
      } finally {
        setIsReady(true);
      }
    };

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading app...</Text>
      </View>
    );
  }

  return <Slot />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});