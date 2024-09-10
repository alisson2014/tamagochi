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
                        fontFamily: focused ? 'Poppins-SemiBold' : 'Poppins-Regular',
                        color
                    }
                ]}
            >
                {name}
            </Text>
        </View>
    );
};

