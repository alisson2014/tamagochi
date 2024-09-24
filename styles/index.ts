import { StyleSheet } from "react-native";
import { petDetailsStyles } from './petDetails';
import { createStyles } from "./createStyles";

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5ff'
    },
    input: {
        height: 64,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 8,
        paddingHorizontal: 16 
    }
});

export const { container: scrollViewContainer } = StyleSheet.create({
    container: {
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 24,
        marginBottom: 24,
    }
});

export const { container: safeAreaViewContainer } = StyleSheet.create({
    container: {
        height: '100%'
    }
});

export const { mainTitle } = StyleSheet.create({
    mainTitle: {
        fontSize: 24,
        fontWeight: '800',
        lineHeight: 32,
        color: '#252521',
        fontFamily: 'Poppins-SemiBold'
    }
});

export const { label } = StyleSheet.create({
    label: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        fontWeight: '500',
    }
});

export const { formGroup } = StyleSheet.create({
    formGroup: {
        display: 'flex',
        gap: 8
    }
});

export { petDetailsStyles, createStyles };