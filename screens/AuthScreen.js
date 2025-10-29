import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { colors } from '../styles/colors';
import { authStyles } from '../styles/AuthStyles';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [animationValue] = useState(new Animated.Value(0));

  const handleToggle = (loginSelected) => {
    Animated.timing(animationValue, {
      toValue: loginSelected ? 0 : 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setIsLogin(loginSelected);
  };

  const translateX = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={authStyles.container}>
      <View style={authStyles.header}>
        <Text style={authStyles.title}>ReciclAÊ</Text>
        <Text style={authStyles.subtitle}>Valor pra você, vida pra natureza.</Text>
      </View>

      <View style={authStyles.switchContainer}>
        <View style={authStyles.switchBackground}>
          <Animated.View
            style={[
              authStyles.switchSlider,
              { transform: [{ translateX }] },
            ]}
          />
          <TouchableOpacity
            style={authStyles.switchButton}
            onPress={() => handleToggle(true)}
          >
            <Text
              style={[
                authStyles.switchText,
                isLogin && authStyles.switchTextActive,
              ]}
            >
              Tenho Conta
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={authStyles.switchButton}
            onPress={() => handleToggle(false)}
          >
            <Text
              style={[
                authStyles.switchText,
                !isLogin && authStyles.switchTextActive,
              ]}
            >
              Quero me Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={authStyles.formContainer}>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </View>
    </View>
  );
}
