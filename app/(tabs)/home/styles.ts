import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#999',
        height: 54,
    },
    searchInput: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        color: '#424242'
    }
});