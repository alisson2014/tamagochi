import { icons } from "@/constants";
import { TouchableOpacity, Image, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import { IPetItem } from "./types";
import { router } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function PetItem({ 
    data, 
    markFavorite, 
    deletePet,
    showBookmark = false, 
    ...rest 
}: IPetItem) {
    return (
        <Pressable {...rest} style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{data.name}</Text>

                <View style={styles.options}>
                    {showBookmark && (
                        <TouchableOpacity onPress={() => markFavorite(data)}>
                            <MaterialCommunityIcons 
                                name="bookmark-multiple" 
                                size={26} 
                                color={data.favorite ? '#F08000' : '#161622'} 
                            />
                        </TouchableOpacity>
                    )}

                    {typeof deletePet === "function" && (
                        <TouchableOpacity onPress={() => deletePet(data)}>
                            <MaterialCommunityIcons name="delete-forever" size={26} color="#161622" />
                        </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity onPress={() => router.push('/create')}>
                        <MaterialCommunityIcons 
                            name="eye" 
                            size={26} 
                            color="#161622" 
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Image 
                source={{ uri: data.uri }}
                resizeMode='cover'
                style={styles.image}
            />
        </Pressable>
    );
};