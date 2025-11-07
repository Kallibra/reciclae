// navigation/BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context'; // ← ADICIONE
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../styles/colors';

import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import AgendaScreen from '../screens/AgendaScreen';
import VerAnuncios from '../screens/VerAnuncios';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#eee',
            height: 80,
            paddingBottom: 20,     // ← ESPAÇO PRA BARRA DO CELULAR
            paddingTop: 10,
            position: 'absolute',  // ← FIXO NA TELA
            bottom: 0,
            left: 0,
            right: 0,
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: '#888',
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        }}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({ color, focused }) => (
              <Icon name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="PerfilTab"
          component={PerfilScreen}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, focused }) => (
              <Icon name={focused ? 'person' : 'person-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="RecicleTab"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Recicle',
            tabBarIcon: () => (
              <Icon name="leaf" size={28} color="#fff" style={{ backgroundColor: COLORS.primary, padding: 10, borderRadius: 30 }} />
            ),
          }}
        />
        <Tab.Screen
          name="AgendaTab"
          component={AgendaScreen}
          options={{
            tabBarLabel: 'Agenda',
            tabBarIcon: ({ color, focused }) => (
              <Icon name={focused ? 'calendar' : 'calendar-outline'} size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="FeedTab"
          component={VerAnuncios}
          options={{
            tabBarLabel: 'Feed',
            tabBarIcon: ({ color, focused }) => (
              <Icon name={focused ? 'newspaper' : 'newspaper-outline'} size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}