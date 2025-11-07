// screens/AuthScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { COLORS } from '../styles/colors';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const { width } = Dimensions.get('window');
const TOGGLE_WIDTH = width - 80;
const BUTTON_WIDTH = TOGGLE_WIDTH / 2;

export default function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const animation = useRef(new Animated.Value(0)).current;

  const toggle = (toLogin) => {
    Animated.timing(animation, {
      toValue: toLogin ? 0 : 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
    setIsLogin(toLogin);
  };

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BUTTON_WIDTH],
  });

  const sliderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#0B5B29', '#007ACC'], // verde → azul
  });

  const leftTextColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#444444'],
  });

  const rightTextColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#444444', '#FFFFFF'],
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerLogo}>
        <Text style={styles.logoText}>
          RECICL<Text style={styles.ae}>AÊ</Text>
        </Text>
        <Text style={styles.slogan}>
          Valor pra você. <Text style={styles.sloganHighlight}>Vida pra natureza</Text>
        </Text>
      </View>

      {/* TOGGLE FUNCIONANDO */}
      <View style={styles.toggleContainer}>
        {/* SLIDER COLORIDO POR BAIXO - CORRIGIDO */}
        <Animated.View
          style={[
            styles.slider,
            {
              backgroundColor: sliderColor,
              transform: [{ translateX }],
            },
          ]}
        />

        {/* BOTÕES TRANSPARENTES */}
        <TouchableOpacity style={styles.toggleBtn} onPress={() => toggle(true)}>
          <Animated.Text style={[styles.toggleText, { color: leftTextColor }]}>
            TENHO CONTA
          </Animated.Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toggleBtn} onPress={() => toggle(false)}>
          <Animated.Text style={[styles.toggleText, { color: rightTextColor }]}>
            QUERO ME CADASTRAR
          </Animated.Text>
        </TouchableOpacity>
      </View>

      {/* FORM */}
      <View style={styles.formContainer}>
        {isLogin ? <LoginForm navigation={navigation} /> : <RegisterForm navigation={navigation} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B5B29',
  },

  // HEADER
  headerLogo: {
    alignItems: 'center',
    paddingTop: 70,
  },
  logoText: {
    fontSize: 38,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  ae: {
    fontStyle: 'italic',
    fontWeight: '700',
  },
  slogan: {
    fontSize: 15,
    color: '#FFFFFF',
    marginTop: 8,
  },
  sloganHighlight: {
    color: '#FF6B35',
    fontWeight: '700',
  },

  // TOGGLE CORRIGIDO
  toggleContainer: {
    flexDirection: 'row',
    height: 56,
    marginHorizontal: 40,
    marginTop: 40,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: '#CCCCCC',
    backgroundColor: '#F8F8F8',
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: BUTTON_WIDTH,
    height: '100%',
    borderRadius: 28,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  toggleBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: 'transparent',
  },
  toggleText: {
    fontWeight: 'bold',
    fontSize: 13.5,
    letterSpacing: 0.8,
  },

  // FORM
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 40,
    paddingTop: 50,
    overflow: 'hidden',
  },
});