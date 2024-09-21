import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "./styles";

export default function PageLoading() {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Carregando...</Text>
        </View>
    );
};