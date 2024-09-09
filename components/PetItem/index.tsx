import { icons } from "@/constants";
import { usePetsDatabase } from "@/database/usePetsDatabase";
import { TouchableOpacity, Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { IPetItem } from "./types";

export default function PetItem({ data, ...rest }: IPetItem) {
    const petsDatabase = usePetsDatabase();

    const markFavorite = async () => {
        await petsDatabase.markFavorite(data.id, !data.favorite);
    };

    return (
        <Pressable {...rest} style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{data.name}</Text>
                <TouchableOpacity onPress={markFavorite}>
                    <Image 
                        resizeMode='center'
                        style={[
                            styles.bookmark,
                            { tintColor: data.favorite ? '#F08000' : '#161622' }
                        ]}
                        source={icons.bookmark}
                    />
                </TouchableOpacity>
            </View>
            <Image 
                source={{ uri: data.uri }}
                resizeMode='cover'
                style={styles.image}
            />
        </Pressable>
    );
};