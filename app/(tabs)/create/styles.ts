import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    scrollContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 24,
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 32,
        color: '#252521',
        fontFamily: 'Poppins-SemiBold, sans-serif'
    },
    inputContainer: {
        marginTop: 28,
        display: 'flex',
        gap: 16
    },
    uploadButton: {
        width: '100%',
        height: 256,
        borderRadius: 8,
        borderWidth: 2,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        borderColor: '#999'
    },
    uploadImage: {
        width: 32,
        height: 32
    },
    uploadText: {
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 28,
        fontFamily: 'Poppins-Medium, sans-serif'
    },
    uploadCover: {
        width: '100%',
        height: 64,
        borderRadius: 16
    }
});