import { getAttributeColor } from "@/service";
import React from "react";
import { StyleSheet, Text } from "react-native";

type AttributeTextProps = {
    children?: React.ReactNode;
    fontSize?: number;
    range: number;
};

export default function AttributeText({ range, fontSize, children }: AttributeTextProps) {
    return (
        <Text style={[styles.attributeText, { fontSize }]} >
            {children}
            {' '}
            <Text style={{ color: getAttributeColor(range), fontWeight: '800' }}>
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