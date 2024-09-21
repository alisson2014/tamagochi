import React from "react";
import { StyleSheet, Text } from "react-native";

type AttributeTextProps = {
    children?: React.ReactNode;
    range: number;
};

export default function AttributeText({ range, children }: AttributeTextProps) {
    const statusColor = () => {
        if(range >= 60) return '#2C7429';
        else if(range >= 30) return '#F08000';
        else return '#CA0B00';
    };

    return (
        <Text style={styles.attributeText}>
            {children}
            {' '}
            <Text style={{ color: statusColor(), fontWeight: '800' }}>
                {range}%
            </Text>
        </Text>
    );
};

const styles = StyleSheet.create({
    attributeText: {
        fontFamily: 'Poppins-Light',
        fontSize: 14
    }
});