import { CustomButton } from '@/components';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    return (
        <SafeAreaView style={styles.container}>
            <CustomButton 
                title="Go to Home"
                onPress={() => router.navigate("/home")}
            />
            <StatusBar backgroundColor='#2c7377' style='light' />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5ff'
    }
});