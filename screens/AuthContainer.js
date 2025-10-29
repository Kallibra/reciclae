// screens/AuthContainer.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import Login from './Login';
import Register from './Register';
import authStyles from '../styles/AuthStyles';
import { colors } from '../styles/colors';

const { width } = Dimensions.get('window');

export default function AuthContainer() {
  const [isLogin, setIsLogin] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const toggleScreen = (login) => {
    // Evita repetir animação se clicar no mesmo botão
    if (login === isLogin) return;

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: login ? 0 : -width,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsLogin(login);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={authStyles.container}>
      {/* Cabeçalho */}
      <View style={authStyles.headerContainer}>
        <Text style={authStyles.headerTitle}>RECICLAÊ</Text>
        <Text style={authStyles.headerSubtitle}>
          VALOR PRA VOCÊ, VIDA PRA NATUREZA
        </Text>
      </View>

      {/* Botões TENHO CONTA / QUERO ME CADASTRAR */}
      <View style={authStyles.authToggleContainer}>
        <TouchableOpacity
          style={[
            authStyles.authToggleButton,
            isLogin ? authStyles.activeButton : authStyles.inactiveButton,
          ]}
          onPress={() => toggleScreen(true)}
        >
          <Text
            style={[
              authStyles.authButtonText,
              isLogin
                ? authStyles.activeButtonText
                : authStyles.inactiveButtonText,
            ]}
          >
            TENHO CONTA
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            authStyles.authToggleButton,
            !isLogin ? authStyles.activeButton : authStyles.inactiveButton,
          ]}
          onPress={() => toggleScreen(false)}
        >
          <Text
            style={[
              authStyles.authButtonText,
              !isLogin
                ? authStyles.activeButtonText
                : authStyles.inactiveButtonText,
            ]}
          >
            QUERO ME CADASTRAR
          </Text>
        </TouchableOpacity>
      </View>

      {/* Formulário (com slide + fade) */}
      <Animated.View
        style={{
          flexDirection: 'row',
          width: width * 2,
          transform: [{ translateX: slideAnim }],
          opacity: fadeAnim,
        }}
      >
        <View style={{ width }}>
          <Login />
        </View>
        <View style={{ width }}>
          <Register />
        </View>
      </Animated.View>
    </View>
  );
}
