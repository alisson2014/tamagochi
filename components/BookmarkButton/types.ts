import { TouchableOpacityProps } from "react-native";

export type BookmarkButtonProps = TouchableOpacityProps & {
    isFavorite: boolean;
};