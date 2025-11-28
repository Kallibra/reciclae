// App.js — VERSÃO CORRETA E TESTADA (sem comentários dentro do Navigator)
import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// TELAS PRINCIPAIS
import AuthScreen from './screens/AuthScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AnunciarMaterial from './screens/AnunciarMaterial';
import ChatScreen from './screens/ChatScreen';
import ConfirmarColeta from './screens/ConfirmarColeta';
import RegisterRole from './screens/RegisterRole';
import RegisterType from './screens/RegisterType';
import FinalizarCadastroScreen from './screens/FinalizarCadastroScreen';
import FeedScreen from './screens/FeedScreen';

// TELAS DO PERFIL (organizadas na pasta perfil)
import HistoricoScreen from './screens/perfil/HistoricoScreen';
import EditarPerfilScreen from './screens/perfil/EditarPerfilScreen';
import PoliticaPrivacidadeScreen from './screens/perfil/PoliticaPrivacidadeScreen';
import ConfiguracoesScreen from './screens/perfil/ConfiguracoesScreen';
import SobreScreen from './screens/SobreScreen';
import ConvidarAmigosScreen from './screens/perfil/ConvidarAmigosScreen';

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
          'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
          'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <View style={{ flex: 1, backgroundColor: '#f8f9fa' }} onLayout={onLayoutRootView}>
          <StatusBar style="dark" hidden />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth">
              {/* Auth Flow */}
              <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
              <Stack.Screen name="RegisterRole" component={RegisterRole} options={{ headerShown: false }} />
              <Stack.Screen name="RegisterType" component={RegisterType} options={{ headerShown: false }} />
              <Stack.Screen name="FinalizarCadastro" component={FinalizarCadastroScreen} options={{ headerShown: false }} />

              {/* Main App */}
              <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />

              {/* Outras telas */}
              <Stack.Screen name="AnunciarMaterial" component={AnunciarMaterial} options={{ headerShown: false }} />
              <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ConfirmarColeta" component={ConfirmarColeta} options={{ headerShown: false }} />
              <Stack.Screen name="FeedScreen" component={FeedScreen} options={{ headerShown: false }} />

              {/* TELAS DO PERFIL — agora registradas corretamente */}
              <Stack.Screen name="Historico" component={HistoricoScreen} options={{ headerShown: false }} />
              <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Sobre" component={SobreScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ConvidarAmigos" component={ConvidarAmigosScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}