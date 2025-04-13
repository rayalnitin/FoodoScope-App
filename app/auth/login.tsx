import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../stores/authStore";
import DismissKeyboard from "@/components/DismissKeyboard";
import { authApi , userApi } from "@/utils/api";
import { useOnboardingStore } from "../../stores/onboardingStore";

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuthStore();
    const onboardingStore = useOnboardingStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            setError("");
            
            // Validate input
            if (!email || !password) {
                setError("Please fill in all fields");
                return;
            }
            
            // Attempt login
            const response = await authApi.login({ email, password });
            if (!response.success || !response.data) {
                throw new Error(response.message || "Login failed");
            }
            
            // Extract user data
            const { token, user } = response.data;
            
            // Store in auth store
            login(token, user);
            
            // Set current user ID in onboarding store
            onboardingStore.setCurrentUserId(user.id);
            
            console.log("Login successful for user:", user.id);
            
            try {
                // Fetch user profile data
                const profileResponse = await userApi.getUserProfileData(user.id);
                
                if (profileResponse.success && profileResponse.data) {
                    // Update user data in onboarding store
                    onboardingStore.setUserData(user.id, profileResponse.data);
                    
                    // Set onboarded status
                    onboardingStore.setIsOnboarded(
                        user.id,
                        profileResponse.data.isOnboarded || false
                    );
                    
                    console.log("Profile loaded, onboarded status:", 
                        profileResponse.data.isOnboarded || false);
                }
                
                // Get fresh state after all updates
                const userProfiles = onboardingStore.userProfiles;
                const isOnboarded = userProfiles[user.id]?.isOnboarded || false;
                
                console.log("Checking final onboarding status:", isOnboarded);
                
                // Navigate based on onboarding status
                if (isOnboarded) {
                    console.log("User is onboarded, going to dashboard");
                    router.replace("/screens/dashboard" as any);
                } else {
                    console.log("User needs onboarding, starting flow");
                    router.replace("/onboarding/screen1" as any);
                }
            } catch (profileError: any) {
                console.error("Error loading profile, defaulting to onboarding:", profileError);
                // If we can't load profile, default to onboarding
                router.replace("/onboarding/screen1" as any);
            }
        } catch (error: any) {
            setError(error.message || "An error occurred during login");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const navigateToForgotPassword = () => {
        router.push("/auth/forgot-password" as any);
    };

    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Login to your account</Text>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.forgotPasswordContainer}
                        onPress={navigateToForgotPassword}
                    >
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, (!email || !password) && styles.buttonDisabled]}
                        onPress={handleLogin}
                        disabled={isLoading || !email || !password}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => router.push("/auth/signup" as any)}>
                        <Text style={styles.signupText}>Sign Up</Text>
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
        backgroundColor: "#fff",
    },
    header: {
        marginTop: 60,
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#000",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
    },
    form: {
        marginBottom: 24,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8,
        color: "#333",
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    button: {
        backgroundColor: "#000",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    footerText: {
        fontSize: 14,
        color: "#666",
    },
    signupText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
        marginLeft: 5,
    },
    errorText: {
        color: "red",
        marginBottom: 16,
        textAlign: "center",
    },
    forgotPasswordContainer: {
        alignItems: "flex-end",
        marginBottom: 8,
    },
    forgotPasswordText: {
        color: "#007AFF",
        fontSize: 14,
    },
}); 