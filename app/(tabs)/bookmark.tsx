import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Bookmark() {
  return (
    <View style={styles.container}>
      <Text>Bookmark</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5ff'
  }
});