import { Pet } from "@/types";
import { Image, Pressable, PressableProps, Text } from "react-native";

type IPetItem = PressableProps & {
    data: Pet
};

export default function PetItem({ data, ...rest }: IPetItem) {
    return (
        <Pressable {...rest} style={{ 
            backgroundColor: '#cecece', 
            paddingLeft: 24,
            borderRadius: 5,
            gap: 12,
            flexDirection: 'row'
        }}>
            <Text>{data.id} - {data.name} - {data.favorite}</Text>
            {data.uri && (
                <Image 
                    source={{ uri: data.uri }}
                    resizeMode='cover'
                />
            )}
        </Pressable>
    );
};