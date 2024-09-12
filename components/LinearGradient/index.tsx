import { LinearGradient as LnGradient, LinearGradientProps } from 'expo-linear-gradient';
import React from 'react'
import { styles } from './styles';

export default function LinearGradient({ ...props }: Omit<LinearGradientProps, "colors">) {
  return (
    <LnGradient
        style={styles.container}
        {...props}
        colors={['transparent', 'rgba(0, 0, 0, 0.4)']}
    />
  );
};