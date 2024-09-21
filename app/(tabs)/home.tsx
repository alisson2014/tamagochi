import { PetItem, SearchPet, CustomLink, LinearGradient, PageLoading } from '@/components';
import { usePetsDatabase } from '@/database';
import { mainTitle, scrollViewContainer } from '@/styles';
import { Pet } from '@/types';
import { useFocusEffect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {  useState, useCallback } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { searchByName, toggleFavorite, remove } = usePetsDatabase();

  const list = useCallback(async () => {
    try {
      if(!search) setLoading(true);
      const response = await searchByName(search);
      setPets(response);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao buscar os bichinhos, tente novamente mais tarde");
      console.error(`Erro ao buscar bichinhos: ${error}`);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  }, [search]);

  const markFavorite = useCallback(async (pet: Pet) => {
    try {
        await toggleFavorite(pet.id, !pet.favorite);
        setPets(prev => prev.map(p => p.id === pet.id ? { ...p, favorite: !p.favorite } : p));
    } catch (error) {
        console.error(`Erro ao salvar favorito: ${error}`);
    }
  }, []);

  const deletePet = useCallback((pet: Pet) => {
    Alert.alert(
      "Atenção!",
      `Você tem certeza que deseja excluir o bichinho ${pet.name}? :(`,  
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await remove(pet.id);
              await list();
            } catch (error) {
              console.error(`Erro ao deletar bichinho: ${error}`);
            }
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  }, [list]);

  useFocusEffect(
    useCallback(() => {
      list();
    }, [list])
  );

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View style={[scrollViewContainer, { flex: loading ? 1 : 0 }]}>
        <Text style={[mainTitle, { marginBottom: 16 }]}>Encontre seu bichinho</Text>

        <SearchPet 
          onClear={() => setSearch("")}
          onChangeText={e => setSearch(e)} 
          value={search} 
        />

        {loading ? <PageLoading /> : (
          <>          
            <FlatList 
              ListHeaderComponent={
                <>
                  {pets.length === 0 && (
                    <CustomLink href='/create' title='Nenhum bichinho encontrado :< Que tal cadastrar um?' />
                  )}
                </>
              }
              data={pets}
              renderItem={({ item }) => (
                <PetItem 
                  data={item} 
                  markFavorite={markFavorite} 
                  deletePet={deletePet}
                  showBookmark
                />
              )}
              contentContainerStyle={{ paddingBottom: 32, gap: 16 }}
              style={{ maxHeight: '84%' }}
            />
            {pets.length > 2 && <LinearGradient />}
          </>
        )}
      </View>

      <StatusBar style='dark' />
    </SafeAreaView>
  );
};