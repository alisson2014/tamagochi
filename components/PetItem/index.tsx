import { Pet } from "@/types";
import { Pressable, PressableProps, Text } from "react-native";

type IPetItem = PressableProps & {
    data: Pet
};

export default function PetItem({ data, ...rest }: IPetItem) {
    return (
        <Pressable {...rest}>
            <Text>{data.id} - {data.name} - {data.uri} - {data.favorite}</Text>
        </Pressable>
    );
};