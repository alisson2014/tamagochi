import { TouchableOpacity, Image, Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { IPetItem } from './types';
import { router, type Href } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function PetItem({ 
    data, 
    markFavorite, 
    deletePet,
    showBookmark = false, 
    ...rest 
}: IPetItem) {
    const petRoute: Href<object | string> = {
        pathname: '/[petDetails]',   
        params: { petDetails: data.id }
    };

    return (
        <Pressable {...rest} style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{data.name}</Text>

                <Text>{data.status}</Text>

                <View style={styles.options}>
                    {showBookmark ? (
                        <TouchableOpacity onPress={() => markFavorite(data)}>
                            <MaterialCommunityIcons 
                                name={data.favorite ? 'bookmark-multiple' : 'bookmark-multiple-outline'}
                                size={28} 
                                color='#F08000' 
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => markFavorite(data)}> 
                            <MaterialCommunityIcons name="bookmark-off-outline" size={28} color="#F08000" />
                        </TouchableOpacity>
                    )}

                    {typeof deletePet === 'function' && (
                        <TouchableOpacity onPress={() => deletePet(data)}>
                            <MaterialCommunityIcons name='delete-forever' size={28} color='#ca0b00' />
                        </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity 
                        onPress={() => router.push(petRoute)}
                    > 
                        <MaterialCommunityIcons 
                            name='eye' 
                            size={28} 
                            color='#2262c9' 
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