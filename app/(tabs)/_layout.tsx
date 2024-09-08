import { Tabs } from 'expo-router';
import { icons } from '@/constants';
import { TabIcon } from '@/components';

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#F08000',
          tabBarInactiveTintColor: '#161622',
          tabBarStyle: {
            backgroundColor: '#CDCDE0',
            borderTopWidth: 1,
            borderTopColor: '#E2DFD2',
            height: 84
          }
        }}
      >
        <Tabs.Screen
          name='home/index'
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                source={icons.home}
                tintColor={color}
                name='Home'
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='bookmark'
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                source={icons.bookmark}
                tintColor={color}
                name='Bookmark'
                focused={focused}
              />
            )
          }}
        />
        <Tabs.Screen
          name='create/index'
          options={{
            title: 'Adicionar',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                source={icons.plus}
                tintColor={color}
                name='Adicionar'
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  );
};