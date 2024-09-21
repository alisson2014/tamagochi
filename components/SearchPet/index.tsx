import { View, TextInput, Image } from 'react-native';
import { icons } from '@/constants';
import { styles } from './styles';
import { SearchPetProps } from './types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SearchPet({ onClear, ...props }: SearchPetProps) {
  return (
    <View style={styles.searchContainer}>
        <TextInput 
            maxLength={50}
            placeholder='Digite o nome do seu bichinho' 
            style={styles.searchInput} 
            {...props}
        />

        {props.value && (
          <MaterialIcons 
            name="clear" 
            size={24} 
            color="black" 
            onPress={onClear}
          /> 
        )}
        
        <Image 
            resizeMode='center'
            source={icons.search}
            style={{ tintColor: "black" }}
        />
  </View>
  );
};