import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "../stores/authStore";
import { useOnboardingStore } from "../stores/onboardingStore";

export default function Dashboard() {
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const { userData } = useOnboardingStore();

    const handleLogout = () => {
        logout();
        router.replace("/auth/login" as any);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.welcomeText}>Hello, {user?.name || userData.name}!</Text>
                <Text style={styles.subtitle}>Welcome to your FoodScope Dashboard</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>0</Text>
                    <Text style={styles.statLabel}>Meals Logged</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>0</Text>
                    <Text style={styles.statLabel}>Goals Set</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>0</Text>
                    <Text style={styles.statLabel}>Days Streak</Text>
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Log a Meal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Set Goals</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>Track Progress</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.infoCard}>
                <Text style={styles.infoCardTitle}>Your Profile</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Name:</Text>
                    <Text style={styles.infoValue}>{userData.name}</Text>
                </View>
                {userData.gender && (
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Gender:</Text>
                        <Text style={styles.infoValue}>{userData.gender}</Text>
                    </View>
                )}
                {userData.age && (
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Age:</Text>
                        <Text style={styles.infoValue}>{userData.age}</Text>
                    </View>
                )}
                {userData.height && (
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Height:</Text>
                        <Text style={styles.infoValue}>{userData.height} cm</Text>
                    </View>
                )}
                {userData.weight && (
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Weight:</Text>
                        <Text style={styles.infoValue}>{userData.weight} kg</Text>
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        padding: 24,
        paddingTop: 60,
        backgroundColor: "#000",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "700",
        color: "#fff",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "rgba(255, 255, 255, 0.7)",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    statCard: {
        flex: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        marginHorizontal: 4,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    statValue: {
        fontSize: 24,
        fontWeight: "700",
        color: "#000",
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: "#666",
    },
    sectionHeader: {
        padding: 16,
        paddingBottom: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },
    actionsContainer: {
        padding: 16,
        paddingTop: 0,
    },
    actionButton: {
        backgroundColor: "#f5f5f5",
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000",
    },
    infoCard: {
        margin: 16,
        padding: 16,
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
    },
    infoCardTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: "row",
        marginBottom: 8,
    },
    infoLabel: {
        fontSize: 14,
        color: "#666",
        width: 80,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: "500",
    },
    logoutButton: {
        margin: 16,
        padding: 16,
        backgroundColor: "#f44336",
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 40,
    },
    logoutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
}); 