import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingState = {
  isOnboarded: boolean;
  userData: {
    name: string;
    gender: string;
    age: string;
    location: string;
    height: string;
    weight: string;
    goalWeight: string;
    goals: string[];
  };
  setIsOnboarded: (value: boolean) => void;
  setUserData: (data: Partial<OnboardingState["userData"]>) => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      isOnboarded: false,
      userData: {
        name: "",
        gender: "",
        age: "",
        location: "",
        height: "",
        weight: "",
        goalWeight: "",
        goals: [],
      },
      setIsOnboarded: (value) => set({ isOnboarded: value }),
      setUserData: (data) =>
        set((state) => ({ userData: { ...state.userData, ...data } })),
    }),
    {
      name: "onboarding-storage",
    }
  )
);