import { Pet } from "@/types";
import { PressableProps } from "react-native";

export type IPetItem = PressableProps & {
    data: Pet,
    markFavorite: (pet: Pet) => void,
    showBookmark?: boolean
};