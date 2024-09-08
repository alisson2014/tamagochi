import React from 'react';
import { View, Text, Image } from 'react-native';
import { ITabIcon } from './types';
import { styles } from './styles';

export default function TabIcon({ name, focused, ...props }: ITabIcon) {
    const { tintColor: color } = props;

    return (
        <View style={styles.container}>
            <Image 
                resizeMode='contain'
                style={styles.image}
                {...props}
            />
            
            <Text 
                style={[
                    styles.iconName,
                    { 
                        fontFamily: focused ? 'Poppins-SemiBold, sans-serif' : 'Poppins-Regular, sans-serif',
                        color
                    }
                ]}
            >
                {name}
            </Text>
        </View>
    );
};

