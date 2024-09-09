import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from "expo-document-picker";
import { useState, useEffect } from 'react';
import { NewPet } from '@/types';
import { icons } from '@/constants';
import { CustomButton } from '@/components';
import { styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import * as baseStyles from '@/styles';
import { usePetsDatabase } from '@/database/usePetsDatabase';

const initPet: NewPet = {
  name: '',
  uri: ''
};

export default function Create() {
  const [pet, setPet] = useState<NewPet>(initPet);
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const petsDatabase = usePetsDatabase();

  const handleSubmit = async () => {
    if(!pet.name) {
      return Alert.alert('Nome', 'Nome do bichinho é obrigatório');
    } else if (!pet.uri) {
      return Alert.alert('Imagem', 'Imagem do bichinho é obrigatória');
    }

    setLoading(true);
    try {
      const { insertedRowId } = await petsDatabase.create(pet);
      Alert.alert(`Novo bichinho cadastrado com sucesso ID: ${insertedRowId}`);
      setPet(initPet);
    } catch (error) {
      Alert.alert(`Erro ao salvar bichinho :<`);
      console.error(`Erro ao salvar novo bichinho: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const openImagePicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*']
    });
    

    if (!result.canceled) {
      setPet({
        ...pet,
        uri: result.assets[0].uri,
      });
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  useEffect(() => {
    setDisabledSubmit(!pet.name);
  }, [pet]);

  return (
    <SafeAreaView style={baseStyles.safeAreaViewContainer}>
      <ScrollView style={baseStyles.scrollViewContainer}>
        <Text style={baseStyles.mainTitle}>
          Cadastre seu bichinho
        </Text>

        <View style={styles.inputContainer}>
          <View style={baseStyles.formGroup}>
            <Text style={baseStyles.label}>Nome</Text>
            <TextInput 
              autoFocus
              maxLength={50}
              placeholder='Digite o nome do seu bichinho' 
              style={baseStyles.defaultStyles.input} 
              onChangeText={name => setPet({ ...pet, name })}
              value={pet.name}
            />
          </View>

          <View style={baseStyles.formGroup}>
            <Text style={baseStyles.label}>Imagem</Text>
            <TouchableOpacity onPress={openImagePicker}>
              {pet.uri ? (
                <Image
                  source={{ uri: pet.uri }}
                  resizeMode='cover'
                  style={styles.uploadCover}
                />
              ) : (
                <View style={styles.uploadButton}>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    alt='upload'
                    style={styles.uploadImage}
                  />
                  <Text style={styles.uploadText}>
                    Escolha uma imagem
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          <CustomButton 
            title='Salvar'
            onPress={handleSubmit}
            disabled={disabledSubmit}
            isLoading={loading}
          />
        </View>
      </ScrollView>

      <StatusBar style='dark' />
    </SafeAreaView>
  );
};