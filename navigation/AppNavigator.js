import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthScreen from '../screens/AuthScreen';
import SellOrBuyScreen from '../screens/SellOrBuyScreen';
import TipoDePessoaScreen from '../screens/TipoDePessoaScreen';
import FinalizarCadastroScreen from '../screens/FinalizarCadastroScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="SellOrBuy" component={SellOrBuyScreen} />
        <Stack.Screen name="TipoDePessoa" component={TipoDePessoaScreen} />
        <Stack.Screen name="FinalizarCadastro" component={FinalizarCadastroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RegisterType" component={RegisterType} />
        <Stack.Screen name="FinalizarCadastro" component={FinalizarCadastroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
