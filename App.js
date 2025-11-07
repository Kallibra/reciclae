// App.js
import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';

// TELAS
import AuthScreen from './screens/AuthScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AnunciarMaterial from './screens/AnunciarMaterial';
import ChatScreen from './screens/ChatScreen';
import ConfirmarColeta from './screens/ConfirmarColeta';
import RegisterRole from './screens/RegisterRole';
import RegisterType from './screens/RegisterType';
import FinalizarCadastroScreen from './screens/FinalizarCadastroScreen';
import PoliticaPrivacidade from './screens/perfil-screen/PoliticaPrivacidade';

const Stack = createStackNavigator();

// MANTÉM O SPLASH ATIVO ATÉ CARREGAR FONTES
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
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterRole" component={RegisterRole} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterType" component={RegisterType} options={{ headerShown: false }} />
          <Stack.Screen name="FinalizarCadastro" component={FinalizarCadastroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="AnunciarMaterial" component={AnunciarMaterial} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="ConfirmarColeta" component={ConfirmarColeta} />
          <Stack.Screen name="PoliticaPrivacidade" component={PoliticaPrivacidade} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}