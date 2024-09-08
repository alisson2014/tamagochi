import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c7377',
        borderRadius: 8,
        minHeight: 64,
        width: '100%'
    },
    text: {
        fontFamily: 'Poppins-SemiBold, sans-serif',
        color: '#161622',
        fontSize: 18
    },
    loading: {
        marginLeft: 2
    }
});