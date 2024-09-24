import { View, TextInput, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from "expo-document-picker";
import { useState, useEffect } from 'react';
import { NewPet } from '@/types';
import { icons } from '@/constants';
import { CustomButton } from '@/components';
import { StatusBar } from 'expo-status-bar';
import * as baseStyles from '@/styles';
import { usePetsDatabase } from '@/database';

const initPet: NewPet = {
  name: '',
  uri: ''
};

export default function Create() {
  const [pet, setPet] = useState<NewPet>(initPet);
  const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const { create } = usePetsDatabase();

  const handleSubmit = async () => {
    if(!pet.name) {
      return Alert.alert('Nome', 'Nome do bichinho é obrigatório');
    } else if (!pet.uri) {
      return Alert.alert('Imagem', 'Imagem do bichinho é obrigatória');
    }

    setLoading(true);
    try {
      const { insertedRowId } = await create(pet);
      Alert.alert('Sucesso', `Novo bichinho cadastrado com sucesso`);
      console.info(`Novo bichinho cadastrado com sucesso: ${insertedRowId}`);
      setPet(initPet);
    } catch (error) {
      Alert.alert(`Erro ao salvar bichinho :<`);
      console.error(`Erro ao salvar novo bichinho: ${error}`);
    } finally {
      setTimeout(() => setLoading(false), 500);
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
        console.info("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  useEffect(() => {
    setDisabledSubmit(!pet.name || !pet.uri);
  }, [pet]);

  return (
    <SafeAreaView style={baseStyles.safeAreaViewContainer}>
      <ScrollView style={baseStyles.scrollViewContainer}>
        <Text style={baseStyles.mainTitle}>
          Cadastre seu bichinho
        </Text>

        <View style={baseStyles.createStyles.inputContainer}>
          <View style={baseStyles.formGroup}>
            <Text style={baseStyles.label}>Nome</Text>
            <TextInput 
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
                  style={baseStyles.createStyles.uploadCover}
                />
              ) : (
                <View style={baseStyles.createStyles.uploadButton}>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    alt='upload'
                    style={baseStyles.createStyles.uploadImage}
                  />
                  <Text style={baseStyles.createStyles.uploadText}>
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