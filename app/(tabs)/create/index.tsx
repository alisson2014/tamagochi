import { View, TextInput, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from 'react';
import { Pet } from '@/types';
import { defaultStyles } from '@/styles';
import { icons } from '@/constants';
import { CustomButton } from '@/components';
import { styles } from './styles';
import { StatusBar } from 'expo-status-bar';

export default function Create() {
  const [pet, setPet] = useState<Pet>({ name: '', uri: '' });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>
          Cadastre seu bichinho
        </Text>

        <View style={styles.inputContainer}>
          <TextInput 
            autoFocus
            maxLength={50}
            placeholder='Nome' 
            style={defaultStyles.input} 
            onChangeText={name => setPet({ ...pet, name })}
            value={pet.name}
          />

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

          <CustomButton 
            title="Salvar"
          />
        </View>
      </ScrollView>

      <StatusBar style='dark' />
    </SafeAreaView>
  );
};