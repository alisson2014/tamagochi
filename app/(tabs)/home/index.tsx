import { PetItem, SearchPet, CustomLink } from '@/components';
import { usePetsDatabase } from '@/database';
import { mainTitle, scrollViewContainer } from '@/styles';
import { Pet } from '@/types';
import { useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  useFocusEffect(
    useCallback(() => {
      list();
    }, [list])
  );

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View style={scrollViewContainer}>
        <Text style={[mainTitle, { marginBottom: 16 }]}>Encontre seu bichinho</Text>

        <SearchPet onChangeText={e => setSearch(e)} value={search} />

        <FlatList 
          ListHeaderComponent={
            <>
              {pets.length === 0 && (
                <CustomLink href='/create' title='Nenhum bichinho encontrado :< Que tal cadastrar um?' />
              )}
            </>
          }
          data={pets}
          renderItem={({ item }) => <PetItem data={item} markFavorite={markFavorite} />}
          contentContainerStyle={{ paddingBottom: 16, gap: 16 }}
          style={{ maxHeight: '80%' }}
        />
      </View>

      <StatusBar style='dark' />
    </SafeAreaView>
  );
};