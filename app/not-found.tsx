import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

/**
 * Not found screen for invalid routes
 */
export default function NotFoundScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>404 - Page Not Found</Text>
            <Text style={styles.subtitle}>The page you're looking for doesn't exist.</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace('/')}
            >
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
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
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