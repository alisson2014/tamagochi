import { View, TextInput, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from 'react';
import { Pet } from '@/types';
import { icons } from '@/constants';
import { CustomButton } from '@/components';
import { styles } from './styles';
import { StatusBar } from 'expo-status-bar';
import * as baseStyles from '@/styles';

export default function Create() {
  const [pet, setPet] = useState<Pet>({ name: '', uri: '' });

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
            <TouchableOpacity onPress={() => {}}>
              {pet.uri ? (
                <Image
                  source={{ uri: pet.uri }}
                  resizeMode="cover"
                  style={styles.uploadCover}
                />
              ) : (
                <View style={styles.uploadButton}>
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
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
            title="Salvar"
          />
        </View>
      </ScrollView>

      <StatusBar style='dark' />
    </SafeAreaView>
  );
};