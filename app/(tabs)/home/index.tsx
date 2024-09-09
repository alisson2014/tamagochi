import PetItem from '@/components/PetItem';
import { usePetsDatabase } from '@/database/usePetsDatabase';
import { mainTitle, scrollViewContainer } from '@/styles';
import { Pet } from '@/types';
import { Link } from 'expo-router';
import { useEffect, useState, useCallback } from 'react';
import { Alert, FlatList, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const petsDatabase = usePetsDatabase();

  const list = useCallback(async () => {
    setLoading(true);
    try {
      const response = await petsDatabase.searchByName(search);
      setPets(response);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao buscar os bichinhos, tente novamente mais tarde");
      console.error(`Erro ao buscar bichinhos: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [pets]);

  useEffect(() => {
    list();
  }, [list]);

  return (
    <SafeAreaView style={{ height: '100%' }}>
        <ScrollView style={scrollViewContainer}>
            <Text style={mainTitle}>Encontre seu bichinho</Text>
            {pets.length === 0 && (
              <Link href='/create' style={{ color: '#F08000', fontWeight: '500' }}>Cadastre seu primeiro bichinho</Link>
            )}
            <FlatList 
              data={pets}
              renderItem={({ item }) => <PetItem data={item} />}
              contentContainerStyle={{ gap: 16 }}
            />
        </ScrollView>
    </SafeAreaView>
  );
};