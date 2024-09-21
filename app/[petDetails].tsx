import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { usePetsDatabase } from '@/database';
import { Pet } from '@/types';
import { PageLoading } from '@/components';
import { getStatusColor } from '@/service';
import { BookmarkButton, AttributeText } from '@/components';

const initialPet: Pet = {
  id: 0,
  name: '',
  uri: '',
  created_at: '',
  hunger: 0,
  sleep: 0,
  fun: 0,
  status: 'ok',
  favorite: false,
};

export default function PetDetails() {
  const { petDetails: id } = useLocalSearchParams();

  const [pet, setPet] = useState<Pet>(initialPet);
  const [loading, setLoading] = useState<boolean>(true);

  const { getById, toggleFavorite } = usePetsDatabase();

  const getPet = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getById(Number(id));
      setPet(response ?? initialPet);
    } catch (error) {
      console.error(`Erro ao buscar bichinho: ${error}`);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [id]);

  const markFavorite = useCallback(async () => {
    try {
      await toggleFavorite(pet.id, !pet.favorite);
      setPet(prev => ({ ...prev, favorite: !prev.favorite }));
    } catch (error) {
      console.error(`Erro ao salvar favorito: ${error}`);
    }
  }, []);

  useEffect(() => {
    getPet();
  }, [getPet]);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <View style={styles.container}>
      {pet.id !== 0 ? (
        <View>
          <View style={styles.detailsTop}>
            <View>
              <Text style={styles.name}>{pet.name}</Text>
              <Text style={[styles.status, { color: getStatusColor(pet.status) }]}>{pet.status}</Text>
            </View>

            <BookmarkButton isFavorite={pet.favorite} onPress={markFavorite} />
          </View>

          <Image
            source={{ uri: pet?.uri }}
            resizeMode='cover'
            alt='upload'
            style={styles.petImage}
          />

          <View style={styles.detailsAttributes}>
            <AttributeText range={pet.fun} fontSize={22}>Diversão:</AttributeText>
            <AttributeText range={pet.hunger} fontSize={22}>Fome:</AttributeText>
            <AttributeText range={pet.sleep} fontSize={22}>Sono:</AttributeText>
          </View>

          {/* Colocar opções de ação aqui */}
          {/* Alimentar o pet, brincar com o pet, colocar o pet para dormir */}

          {/* Adicionar rota de mini games */}
        </View>
      ) : <Text>Pet não encontrado</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 32
  },
  detailsTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailsAttributes: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Poppins-ExtraBold',
    fontWeight: 'bold',
    marginTop: 16,
  },
  status: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  attributeText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
  },
  petImage: {
    width: '100%',
    height: 320,
    borderRadius: 272,
    marginVertical: 32,
  }
});