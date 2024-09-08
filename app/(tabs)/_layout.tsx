import { Tabs } from 'expo-router';
import { icons } from '@/constants';
import { TabIcon } from '@/components';

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#56ac24',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84
          }
        }}
      >
        <Tabs.Screen
          name='home'
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
          name='create'
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon 
                source={icons.plus}
                tintColor={color}
                name='Create'
                focused={focused}
              />
            )
          }}
        />
      </Tabs>
    </>
  );
};