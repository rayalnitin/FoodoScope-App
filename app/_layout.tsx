// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }
// app/_layout.tsx
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { useOnboardingStore } from "../stores/onboardingStore";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { isOnboarded } = useOnboardingStore();

  useEffect(() => {
    // if (isLoading) return;

    const inOnboardingGroup = segments[0] === "onboarding";
    
    if (!isOnboarded && !inOnboardingGroup) {
      router.replace("/onboarding/screen1");
    } else if (isOnboarded && inOnboardingGroup) {
      router.replace("/");
    }
  }, [isOnboarded, segments]);

  return <Slot />;
}