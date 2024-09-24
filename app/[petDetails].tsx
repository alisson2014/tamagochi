import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { usePetsDatabase } from '@/database';
import { Pet } from '@/types';
import { PageLoading } from '@/components';
import { getPetStatus, getStatusColor } from '@/service';
import { BookmarkButton, AttributeText } from '@/components';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { petDetailsStyles } from '@/styles';

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

  const { getById, toggleFavorite, eat, putPetToSleep, wakePetUp, play } = usePetsDatabase();

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

  const toPlay = useCallback(async () => {
    try {
      await play(pet.id);
      setPet(prev => ({ ...prev, fun: Math.min(prev.fun + 10, 100) }));
    } catch (error) {
      console.error(`Erro ao brincar com bichinho: ${error}`);
    }
  }, [pet]);

  useEffect(() => {
    getPet();
  }, [getPet]);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <View style={petDetailsStyles.container}>
      {pet.id !== 0 ? (
        <View style={petDetailsStyles.petContainer}>
          <View style={petDetailsStyles.detailsTop}>
            <View>
              <Text style={petDetailsStyles.name}>{pet.name}</Text>
              <Text style={[petDetailsStyles.status, { color: getStatusColor(petStatus) }]}>{petStatus}</Text>
            </View>

            <BookmarkButton isFavorite={pet.favorite} onPress={markFavorite} />
          </View>

          <Image
            source={{ uri: pet?.uri }}
            resizeMode='cover'
            alt='upload'
            style={petDetailsStyles.petImage}
          />

          <View style={petDetailsStyles.detailsAttributes}>
            <AttributeText range={pet.fun} fontSize={22}>Diversão:</AttributeText>
            <AttributeText range={pet.hunger} fontSize={22}>Fome:</AttributeText>
            <AttributeText range={pet.sleep} fontSize={22}>Sono:</AttributeText>
          </View>

          <View style={petDetailsStyles.actionOptions}>
            <TouchableOpacity 
              onPress={toEat} 
              style={[petDetailsStyles.actionButton, pet.hunger === 100 && petDetailsStyles.actionButtonDisabled]}
              disabled={pet.hunger === 100}
            >
              <MaterialCommunityIcons name="food-apple" size={28} color="red" />
              <Text style={petDetailsStyles.actionOptionText}>Comer</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toSleep} style={petDetailsStyles.actionButton}>
              <MaterialCommunityIcons name="sleep" size={28} color="purple" />
              <Text style={petDetailsStyles.actionOptionText}>{pet.is_sleeping ? "Acordar" : "Dormir"}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              disabled={pet.fun === 100}
              onPress={toPlay}
              style={[petDetailsStyles.actionButton, pet.fun === 100 && petDetailsStyles.actionButtonDisabled]}
            >
              <MaterialCommunityIcons name="gamepad-variant" size={28} color="#089158" />
              <Text style={petDetailsStyles.actionOptionText}>Brincar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : <Text>Pet não encontrado</Text>}
    </View>
  );
};