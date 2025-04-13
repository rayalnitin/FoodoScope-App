import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ErrorBoundaryProps } from 'expo-router';

/**
 * Error boundary component that catches and displays errors
 */
export default function ErrorBoundary(props: ErrorBoundaryProps) {
    const router = useRouter();
    const { error } = props;

    // Handle resetting the app state
    const resetApp = () => {
        // Navigate to root
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Oops! Something went wrong.</Text>
            <Text style={styles.subtitle}>We encountered an unexpected error.</Text>

            <View style={styles.errorCard}>
                <Text style={styles.errorText}>{error.message || 'Unknown error'}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={resetApp}>
                <Text style={styles.buttonText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    errorCard: {
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        borderWidth: 1,
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
        width: '100%',
    },
    errorText: {
        color: '#721c24',
        fontSize: 14,
        lineHeight: 20,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
}); 