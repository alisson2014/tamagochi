import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#CDCDE0', 
        paddingHorizontal: 16,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 200
    },
    attributesContainer: {
        display: 'flex',
        gap: 8
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '85%',
    },
    options: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16
    },
    bookmark: {
        width: 32,
        height: 32
    },
    image: {
        marginVertical: 32,
        width: '42.5%',
        height: 144,
        borderRadius: 128,
    }
});