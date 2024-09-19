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
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '700',
        fontSize: 20,
        color: '#161622'
    },
    status: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        color: '#161622'
    },
    attributesContainer: {
        display: 'flex',
        gap: 8
    },
    attributeText: {
        fontFamily: 'Poppins-Light',
        fontStyle: 'italic',
        fontSize: 14
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '80%',
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