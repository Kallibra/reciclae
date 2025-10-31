// screens/AuthScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const toggle = (toLogin) => {
    Animated.timing(animation, {
      toValue: toLogin ? 0 : 1,   
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsLogin(toLogin);
  };

  // AJUSTE: largura do toggle
  const translateX = animation.interpolate({ 
    inputRange: [0, 1], 
    outputRange: [0, 163], // ← Aqui é pra ajustar entre os dois botões 
  });

  const sliderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.primary, COLORS.accent],
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>RECICLAÊ</Text>
        <Text style={styles.subtitle}>VALOR PRA VOCÊ. VIDA PRA NATUREZA</Text>
      </View>

      {/* TOGGLE ANIMADO */}
      <View style={styles.toggleContainer}>
        <Animated.View style={[styles.slider, { backgroundColor: sliderColor, transform: [{ translateX }] }]} />
        <TouchableOpacity style={styles.toggleBtn} onPress={() => toggle(true)}>
          <Text style={[styles.toggleText, isLogin && styles.active]}>TENHO CONTA</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleBtn} onPress={() => toggle(false)}>
          <Text style={[styles.toggleText, !isLogin && styles.active]}>QUERO ME CADASTRAR</Text>
        </TouchableOpacity>
      </View>

      {/* FORMULÁRIO */}
      <View style={styles.formContainer}>
        {isLogin ? <LoginForm navigation={navigation} /> : <RegisterForm navigation={navigation} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary, // ← FUNDO VERDE ESCURO
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#a8e6a1',
    marginTop: 8,
    fontStyle: 'italic',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef', 
    borderRadius: 100, 
    marginHorizontal: 40, 
    padding: 5, 
    position: 'relative',
    overflow: 'hidden', // ← IMPORTANTE
  },
  slider: { // A BOLHA ANIMADA 
    position: 'absolute',
    width: '52%', 
    height: '122%', 
    borderRadius: 100,
    left: 0,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    zIndex: 2,
  },
  toggleText: {
    fontWeight: 'bold',
    color: '#666',
    fontSize: 14,
  },
  active: {
    color: '#fff',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 40,
    paddingTop: 40,
  },
});