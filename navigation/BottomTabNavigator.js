// navigation/BottomTabNavigator.js
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';   // ← IMPORTANTE
import { View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';

import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import AgendaScreen from '../screens/AgendaScreen';
import AnunciarMaterial from '../screens/AnunciarMaterial';
import VerAnuncios from '../screens/VerAnuncios';
import FeedScreen from '../screens/FeedScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        if (data) setUserRole(JSON.parse(data).role);
      } catch (e) { console.log(e); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      {/* ↑ Ignora só o bottom → o TabBar cuida dele */}
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
            backgroundColor: '#fff',
          },
        }}
      >
        {/* suas tabs aqui (igual antes) */}
        <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Início', tabBarIcon: ({color, focused}) => <Icon name={focused ? 'home' : 'home-outline'} size={24} color={color} /> }} />
        <Tab.Screen name="PerfilTab" component={PerfilScreen} options={{ tabBarLabel: 'Perfil', tabBarIcon: ({color, focused}) => <Icon name={focused ? 'person' : 'person-outline'} size={24} color={color} /> }} />
        <Tab.Screen
          name="RecicleTab"
          component={userRole === 'producer' ? AnunciarMaterial : VerAnuncios}
          options={{
            tabBarLabel: userRole === 'producer' ? 'Reciclar' : 'Buscar',
            tabBarIcon: ({focused}) => (
              <Icon name="leaf" size={28} color="#fff" style={{ backgroundColor: focused ? COLORS.primary : '#ccc', padding: 12, borderRadius: 30 }} />
            ),
          }}
        />
        <Tab.Screen name="AgendaTab" component={AgendaScreen} options={{ tabBarLabel: 'Agenda', tabBarIcon: ({color, focused}) => <Icon name={focused ? 'calendar' : 'calendar-outline'} size={24} color={color} /> }} />
        <Tab.Screen name="FeedTab" component={FeedScreen} options={{ tabBarLabel: 'Feed', tabBarIcon: ({color, focused}) => <Icon name={focused ? 'newspaper' : 'newspaper-outline'} size={24} color={color} /> }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}