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

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError("");

            if (!email) {
                setError("Please enter your email address");
                return;
            }

            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError("Please enter a valid email address");
                return;
            }

            const response = await authApi.forgotPassword({ email });

            if (!response.success) {
                throw new Error(response.message || "Failed to process request");
            }

            setIsSubmitted(true);
        } catch (error: any) {
            setError(error.message || "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    // Show success message after submission
    if (isSubmitted) {
        return (
            <View style={styles.container}>
                <View style={styles.successContainer}>
                    <Text style={styles.successTitle}>Email Sent!</Text>
                    <Text style={styles.successText}>
                        If an account exists for {email}, we've sent instructions to reset your password.
                        Please check your email.
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => router.push("/auth/reset-password" as any)}
                    >
                        <Text style={styles.buttonText}>Enter Reset Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.linkButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.linkText}>Return to Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Forgot Password</Text>
                    <Text style={styles.subtitle}>
                        Enter your email and we'll send you a code to reset your password
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

                    <TouchableOpacity
                        style={[styles.button, !email && styles.buttonDisabled]}
                        onPress={handleSubmit}
                        disabled={isLoading || !email}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Send Reset Instructions</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity onPress={() => router.back()}>
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
    successContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        marginTop: -50,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#000",
        marginBottom: 16,
    },
    successText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginBottom: 32,
        lineHeight: 24,
    },
    linkButton: {
        marginTop: 16,
        padding: 8,
    },
    linkText: {
        color: "#000",
        fontSize: 16,
        textDecorationLine: "underline",
    },
}); 