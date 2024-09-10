import { icons } from "@/constants";
import { TouchableOpacity, Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { IPetItem } from "./types";

export default function PetItem({ data, markFavorite, showBookmark = true, ...rest }: IPetItem) {
    return (
        <Pressable {...rest} style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{data.name}</Text>
                {showBookmark && (
                    <TouchableOpacity onPress={() => markFavorite(data)}>
                        <Image 
                            resizeMode='center'
                            style={[
                                styles.bookmark,
                                { tintColor: data.favorite ? '#F08000' : '#161622' }
                            ]}
                            source={icons.bookmark}
                        />
                    </TouchableOpacity>
                )}
            </View>
            <Image 
                source={{ uri: data.uri }}
                resizeMode='cover'
                style={styles.image}
            />
        </Pressable>
    );
};