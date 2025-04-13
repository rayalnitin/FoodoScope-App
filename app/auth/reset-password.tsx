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
import DismissKeyboard from "@/components/DismissKeyboard";
import { authApi } from "@/utils/api";

export default function ResetPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleResetPassword = async () => {
        try {
            setIsLoading(true);
            setError("");

            // Form validation
            if (!email || !resetCode || !newPassword || !confirmPassword) {
                setError("Please fill in all fields");
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError("Please enter a valid email address");
                return;
            }

            // Password validation
            if (newPassword.length < 8) {
                setError("Password must be at least 8 characters long");
                return;
            }

            if (newPassword !== confirmPassword) {
                setError("Passwords do not match");
                return;
            }

            const response = await authApi.resetPassword({
                email,
                resetCode,
                newPassword,
            });

            if (!response.success) {
                throw new Error(response.message || "Failed to reset password");
            }

            // Success! Show alert and redirect to login
            Alert.alert(
                "Password Reset Successful",
                "Your password has been reset successfully. You can now log in with your new password.",
                [
                    {
                        text: "Login",
                        onPress: () => router.replace("/auth/login" as any),
                    },
                ]
            );
        } catch (error: any) {
            setError(error.message || "An error occurred during password reset");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Reset Password</Text>
                    <Text style={styles.subtitle}>
                        Enter the code from your email along with your new password
                    </Text>
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
                            autoComplete="email"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Reset Code</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter 6-digit code"
                            value={resetCode}
                            onChangeText={setResetCode}
                            keyboardType="number-pad"
                            maxLength={6}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>New Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Create new password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm New Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            (!email || !resetCode || !newPassword || !confirmPassword) &&
                            styles.buttonDisabled,
                        ]}
                        onPress={handleResetPassword}
                        disabled={
                            isLoading ||
                            !email ||
                            !resetCode ||
                            !newPassword ||
                            !confirmPassword
                        }
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Reset Password</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => router.push("/auth/login" as any)}>
                        <Text style={styles.footerText}>Back to Login</Text>
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
        marginBottom: 30,
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
        lineHeight: 22,
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
    errorText: {
        color: "red",
        marginBottom: 16,
        textAlign: "center",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    footerText: {
        fontSize: 16,
        color: "#000",
        textDecorationLine: "underline",
    },
}); 