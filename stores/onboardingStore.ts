import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardingState = {
  userProfiles: {
    [userId: string]: {
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
        agreedToTerms?: boolean;
      };
    };
  };
  currentUserId: string | null;
  setCurrentUserId: (userId: string) => void;
  getCurrentUserData: () => any;
  setUserData: (userId: string, data: Partial<OnboardingState["userProfiles"][string]["userData"]>) => void;
  setIsOnboarded: (userId: string, value: boolean) => void;
  resetonBoardingData: () => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      userProfiles: {},
      currentUserId: null,
      
      setCurrentUserId: (userId) => set({ currentUserId: userId }),
      
      getCurrentUserData: () => {
        const { userProfiles, currentUserId } = get();
        if (!currentUserId) return null;
  
        return userProfiles[currentUserId]?.userData || null;
      },
      
      setUserData: (userId, data) => 
        set((state) => ({
          userProfiles: {
            ...state.userProfiles,
            [userId]: {
              isOnboarded: state.userProfiles[userId]?.isOnboarded || false,
              userData: {
                ...state.userProfiles[userId]?.userData || {},
                ...data
              }
            }
          }
        })),
      
      setIsOnboarded: (userId, value) => 
        set((state) => ({
          userProfiles: {
            ...state.userProfiles,
            [userId]: {
              isOnboarded: value,
              userData: state.userProfiles[userId]?.userData || {
                name: "",
                gender: "",
                age: "",
                location: "",
                height: "",
                weight: "",
                goalWeight: "",
                goals: [],
                agreedToTerms: false
              }
            }
          }
        })),
      
      // Just set currentUserId to null, don't wipe out the profiles
      resetonBoardingData: () => set({ currentUserId: null }),
    }),
    {
      name: "onboarding-storage",
    }
  )
);