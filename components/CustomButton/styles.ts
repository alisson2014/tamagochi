import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2C7429',
        borderRadius: 8,
        minHeight: 64,
        width: '100%'
    },
    text: {
        fontFamily: 'Poppins-SemiBold',
        color: '#f5f5ff',
        fontSize: 20,
        fontWeight: '700'
    },
    loading: {
        marginLeft: 16
    }
});