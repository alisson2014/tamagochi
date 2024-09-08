import { TouchableOpacityProps } from "react-native";

export interface ICustomButton extends TouchableOpacityProps {
    title: string;
    containerStyles?: string;
    textStyles?: string;
};