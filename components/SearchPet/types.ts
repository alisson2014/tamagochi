import { TextInputProps } from "react-native";

export type SearchPetProps = TextInputProps & {
    onClear: () => void;
};