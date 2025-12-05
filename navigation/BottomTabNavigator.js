// navigation/BottomTabNavigator.js → VERSÃO FINAL SEM ERRO E ÍCONE FODA!
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { COLORS } from '../styles/colors';

import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import AgendaScreen from '../screens/AgendaScreen';
import AnunciarMaterial from '../screens/AnunciarMaterial';
import VerAnuncios from '../screens/VerAnuncios';
import FeedScreen from '../screens/FeedScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const [userRole, setUserRole] = useState('producer'); // padrão producer
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarRole = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserRole(user.role || 'producer');
        }
      } catch (e) {
        console.log('Erro ao carregar role:', e);
      } finally {
        setLoading(false);
      }
    };
    carregarRole();
  }, []);

  if (loading) {
    return null; // ou um loading bonito
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'home' : 'home-outline'} size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="PerfilTab"
        component={PerfilScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'person' : 'person-outline'} size={28} color={color} />
          ),
        }}
      />

      {/* ÍCONE DO MEIO — AGORA É O REI DO APP! */}
      <Tab.Screen
        name="AnunciarTab"
        component={userRole === 'producer' ? AnunciarMaterial : VerAnuncios}
        options={{
          tabBarLabel: userRole === 'producer' ? 'Anunciar' : 'Coletar',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? COLORS.primary : '#e8f5e8',
                padding: 16,
                borderRadius: 35,
                borderWidth: 4,
                borderColor: '#fff',
                elevation: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                transform: [{ translateY: -20 }],
              }}
            >
              <Icon
                name="add-circle"
                size={48}
                color={focused ? '#fff' : COLORS.primary}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="AgendaTab"
        component={AgendaScreen}
        options={{
          tabBarLabel: 'Agenda',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'calendar' : 'calendar-outline'} size={28} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="FeedTab"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <Icon name={focused ? 'newspaper' : 'newspaper-outline'} size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}