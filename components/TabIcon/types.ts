import { ImageProps } from "react-native";

export interface ITabIcon extends ImageProps {
    name: string;
    focused: boolean;
};