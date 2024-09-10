import PetItem from '@/components/PetItem';
import { usePetsDatabase } from '@/database/usePetsDatabase';
import { mainTitle, scrollViewContainer } from '@/styles';
import { Pet } from '@/types';
import { Link } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { Alert, FlatList, Text, TextInput, View,TouchableOpacity,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as baseStyles from '@/styles';
import { icons } from '@/constants';
import { styles } from './styles';

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState<string>("");
  const [markBook, setMarkbook] = useState<boolean>(false);

  const petsDatabase = usePetsDatabase();

  const list = useCallback(async () => {
    try {
      const response = await petsDatabase.searchByName(search);
      setPets(response);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao buscar os bichinhos, tente novamente mais tarde");
      console.error(`Erro ao buscar bichinhos: ${error}`);
    } finally {
      setMarkbook(false);
    }
  }, [search, markBook]);

  const markFavorite = useCallback(async (pet: Pet) => {
    try {
        await petsDatabase.markFavorite(pet.id, !pet.favorite);
        setMarkbook(true);
    } catch (error) {
        console.error(`Erro ao salvar favorito: ${error}`);
    }
  }, []);

  useEffect(() => {
    list();
  }, [list]);

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View style={scrollViewContainer}>
        <FlatList 
          ListHeaderComponent={
            <>
              <Text style={[mainTitle, { marginBottom: 16 }]}>Encontre seu bichinho</Text>


              <View style={styles.searchContainer}>
                <TextInput 
                  maxLength={50}
                  placeholder='Digite o nome do seu bichinho' 
                  style={styles.searchInput} 
                  onChangeText={e => setSearch(e)}
                  value={search}
                />
                <TouchableOpacity onPress={() => {}}>
                  <Image 
                      resizeMode='center'
                      source={icons.search}
                      style={{ tintColor: "black" }}
                  />
                </TouchableOpacity>
              </View>

              {pets.length === 0 && (
                <Link href='/create' style={{ 
                  color: '#F08000', 
                  fontWeight: '600',
                  fontSize: 18,
                  fontFamily: 'Poppins-Black',
                  textAlign: 'center'
                }}>
                  Nenhum bichinho encontrado {':<'} Que tal cadastrar um?
                </Link>
              )}
            </>
          }
          data={pets}
          renderItem={({ item }) => <PetItem data={item} markFavorite={markFavorite} />}
          contentContainerStyle={{ paddingBottom: 16, gap: 16 }}
        />
      </View>
    </SafeAreaView>
  );
};