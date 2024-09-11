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
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '700',
        fontSize: 20,
        color: '#161622'
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 128
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
        width: '40%',
        height: 128,
        borderRadius: 128,
    }
});