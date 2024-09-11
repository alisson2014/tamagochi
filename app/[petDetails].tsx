import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { usePetsDatabase } from '@/database';
import { Pet } from '@/types';

const PetDetails = () => {
  const { petDetails: id } = useLocalSearchParams();

  const [pet, setPet] = useState<Pet>();
  const [loading, setLoading] = useState<boolean>(true);

  const petsDatabase = usePetsDatabase();

  const getPet = useCallback(async () => {
    setLoading(true);
    try {
      const response = await petsDatabase.getById(Number(id));
      console.log(response);
      setPet(response ?? {} as Pet);
    } catch (error) {
      console.error(`Erro ao buscar bichinho: ${error}`);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getPet();
  }, [getPet]);

  return (
    <View style={styles.container}>
      <Text>{pet?.id}</Text>
      <Text>{pet?.name}</Text>
      <Text>{pet?.favorite}</Text>
      <Image
        source={{ uri: pet?.uri }}
        resizeMode='contain'
        alt='upload'
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  }
});

export default PetDetails;