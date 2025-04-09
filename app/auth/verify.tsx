import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    ToastAndroid, // Import ToastAndroid for Android
    Platform, // Import Platform to check the platform
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuthStore } from "../../stores/authStore";
import DismissKeyboard from "@/components/DismissKeyboard";
import { authApi } from "@/utils/api";

export default function VerifyScreen() {
    const router = useRouter();
    const { userId } = useLocalSearchParams<{ userId: string }>();
    const { login } = useAuthStore();
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [timer, setTimer] = useState(300); // 5 minutes in seconds

    useEffect(() => {
        if (!userId) {
            Alert.alert("Error", "User ID not found. Please try signing up again.");
            router.replace("/auth/signup");
            return;
        }

        console.log("User ID from params:", userId, "type:", typeof userId);

        // Ensure userId is a string (URL params can sometimes be arrays)
        if (typeof userId !== 'string') {
            Alert.alert("Error", "Invalid User ID format. Please try signing up again.");
            router.replace("/auth/signup");
            return;
        }

        // Countdown timer
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [userId, router]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" + secs : secs}`;
    };

    const showToast = (message: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            Alert.alert("Success", message);
        }
    };

    const handleVerify = async () => {
        try {
            setIsLoading(true);
            setError("");

            if (!otp) {
                setError("Please enter the verification code");
                return;
            }

            if (!userId) {
                setError("User ID not found. Please try signing up again.");
                return;
            }

            console.log(`Attempting to verify OTP: ${otp} for userId: ${userId}`);

            const response = await authApi.verifyEmail({ userId, otp });

            console.log("Verification response:", response);

            if (!response.success || !response.data) {
                throw new Error(response.message || "Verification failed");
            }

            // Store token and user data in auth store
            const { token, user } = response.data;
            login(token, user);

            // Show success toast
            showToast("Email verified successfully!");
            console.log("Verification successful, token received:", token);

            // Use Alert for important confirmation on all platforms
            Alert.alert(
                "Verification Successful",
                "Your email has been verified successfully. You can now log in.",
                [
                    {
                        text: "Go to Login",
                        onPress: () => {
                            console.log("Navigating to login screen");
                            router.replace("/auth/login");
                        }
                    }
                ]
            );


        } catch (error: any) {
            console.error("Verification error:", error);

            // Check if error message is empty or undefined
            let errorMessage = "An error occurred during verification";

            if (error.message) {
                // Log the specific error message
                console.error(`Error message: ${error.message}`);
                errorMessage = error.message;

                // Handle specific error cases
                if (error.message.includes("Invalid OTP")) {
                    errorMessage = "The verification code you entered is incorrect. Please try again.";
                } else if (error.message.includes("expired")) {
                    errorMessage = "Your verification code has expired. Please request a new one.";
                } else if (error.message.includes("User is already verified")) {
                    errorMessage = "Your account is already verified. Please proceed to login.";
                    setTimeout(() => {
                        router.replace("/auth/login");
                    }, 2000);
                }
            }

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const resendOtp = async () => {
        try {
            setIsLoading(true);
            setError("");

            if (!userId) {
                setError("User ID not found. Please try signing up again.");
                return;
            }

            console.log(`Attempting to resend OTP for userId: ${userId}`);

            const response = await authApi.resendOtp({ userId });

            console.log("Resend OTP response:", response);

            if (!response.success) {
                throw new Error(response.message || "Failed to resend verification code");
            }

            setTimer(60);

            Alert.alert(
                "Success",
                "A new verification code has been sent to your email"
            );
        } catch (error: any) {
            setError(error.message || "Failed to resend verification code");
            console.error("Resend OTP error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Verify Your Email</Text>
                    <Text style={styles.subtitle}>
                        Enter the 6-digit code we sent to your email
                    </Text>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Verification Code</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter 6-digit code"
                            value={otp}
                            onChangeText={(text) => {
                                // Only allow digits
                                const numericText = text.replace(/[^0-9]/g, '');
                                setOtp(numericText);
                            }}
                            keyboardType="number-pad"
                            maxLength={6}
                            autoFocus
                        />
                    </View>

                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>
                            {timer > 0
                                ? `Code expires in ${formatTime(timer)}`
                                : "Code has expired"}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, !otp && styles.buttonDisabled]}
                        onPress={handleVerify}
                        disabled={isLoading || !otp || !userId}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Verify</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.resendButton, timer > 0 && styles.resendButtonDisabled]}
                        onPress={resendOtp}
                        disabled={timer > 0}
                    >
                        <Text
                            style={[
                                styles.resendButtonText,
                                timer > 0 && styles.resendButtonTextDisabled,
                            ]}
                        >
                            Resend Code
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Didn't receive the code?</Text>
                    <TouchableOpacity onPress={() => router.push("/auth/signup" as any)}>
                        <Text style={styles.signupText}>Try again</Text>
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
        marginBottom: 10,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 16,
        textAlign: "center",
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
        textAlign: "center",
        letterSpacing: 5,
        fontWeight: "700",
    },
    timerContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    timerText: {
        color: "#666",
        fontWeight: "500",
    },
    button: {
        backgroundColor: "#000",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    resendButton: {
        alignItems: "center",
        padding: 10,
    },
    resendButtonDisabled: {
        opacity: 0.5,
    },
    resendButtonText: {
        color: "#000",
        fontWeight: "500",
    },
    resendButtonTextDisabled: {
        color: "#999",
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
}); 