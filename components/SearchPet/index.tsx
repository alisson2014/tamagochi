import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { icons } from '@/constants';
import { styles } from './styles';
import { ISearchPet } from './types';

export default function SearchPet(props: ISearchPet) {
  return (
    <View style={styles.searchContainer}>
        <TextInput 
            maxLength={50}
            placeholder='Digite o nome do seu bichinho' 
            style={styles.searchInput} 
            {...props}
        />
        <TouchableOpacity onPress={() => {}}>
            <Image 
                resizeMode='center'
                source={icons.search}
                style={{ tintColor: "black" }}
            />
        </TouchableOpacity>
  </View>
  );
};