import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { usePetsDatabase } from '@/database';
import { Pet } from '@/types';
import { PageLoading } from '@/components';
import { getPetStatus, getStatusColor } from '@/service';
import { BookmarkButton, AttributeText } from '@/components';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
  is_sleeping: false,
  sleep_start_time: ''
};

export default function PetDetails() {
  const { petDetails: id } = useLocalSearchParams();

  const [pet, setPet] = useState<Pet>(initialPet);
  const [loading, setLoading] = useState<boolean>(true);
  const petStatus = getPetStatus(pet.fun, pet.sleep, pet.hunger);

  const { getById, toggleFavorite, eat, putPetToSleep, wakePetUp } = usePetsDatabase();

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
  }, [pet]);

  const toEat = useCallback(async () => {
    try {
      await eat(pet.id);
      setPet(prev => ({ ...prev, hunger: Math.min(prev.hunger + 10, 100) }));
    } catch (error) {
      console.error(`Erro ao alimentar bichinho: ${error}`);
    }
  }, [pet]);

  const toSleep = useCallback(async () => {
    try {
      if (pet.is_sleeping) {
        await wakePetUp(pet.id);
        await getPet();
      } else {
        await putPetToSleep(pet.id);
        setPet(prev => ({ ...prev, is_sleeping: true }));
      }
    } catch (error) {
      console.error(`Erro ao colocar bichinho para dormir: ${error}`);
    }
  }, [pet]);

  useEffect(() => {
    getPet();
  }, [getPet]);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <View style={styles.container}>
      {pet.id !== 0 ? (
        <View style={styles.petContainer}>
          <View style={styles.detailsTop}>
            <View>
              <Text style={styles.name}>{pet.name}</Text>
              <Text style={[styles.status, { color: getStatusColor(petStatus) }]}>{petStatus}</Text>
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

          <View style={styles.actionOptions}>
            <TouchableOpacity 
              onPress={toEat} 
              style={[styles.actionButton, pet.hunger === 100 && styles.actionButtonDisabled]}
              disabled={pet.hunger === 100}
            >
              <MaterialCommunityIcons name="food-apple" size={28} color="red" />
              <Text style={styles.actionOptionText}>Comer</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toSleep} style={styles.actionButton}>
              <MaterialCommunityIcons name="sleep" size={28} color="purple" />
              <Text style={styles.actionOptionText}>{pet.is_sleeping ? "Acordar" : "Dormir"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="gamepad-variant" size={28} color="#089158" />
              <Text style={styles.actionOptionText}>Brincar</Text>
            </TouchableOpacity>
          </View>
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
  petContainer: {
    display: 'flex',
    gap: 32
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
  },
  actionOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: '#d8c852',
    padding: 20,
    borderRadius: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#999',
  },
  actionOptionText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  }
});