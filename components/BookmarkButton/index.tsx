import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BookmarkButtonProps } from "./types";

export default function BookmarkButton({ isFavorite, ...props }: BookmarkButtonProps) {
    return (
        <TouchableOpacity {...props}>
            <MaterialCommunityIcons 
                name={isFavorite ? 'bookmark-multiple' : 'bookmark-multiple-outline'}
                size={28} 
                color='#F08000' 
            />
        </TouchableOpacity>
    );
};