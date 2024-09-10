import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { 
        backgroundColor: '#CDCDE0', 
        paddingHorizontal: 20,
        borderRadius: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '700',
        fontSize: 18,
        color: '#161622'
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 16
    },
    bookmark: {
        width: 24,
        height: 24
    },
    image: {
        marginVertical: 16,
        width: '36%',
        height: 112,
        borderRadius: 128,
    }
});