// screens/RegisterRole.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export default function RegisterRole({ navigation, route }) {
  const { nickname = 'amigo', email } = route.params || {};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{"<"}</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>PRAZER EM TE CONHECER, {nickname.toUpperCase()}!</Text>
        <Text style={styles.subtitle } fontWeight="bold">
          ME CONTA: COMO VOCÊ COLOCA A TAL PRÁTICA DE SUSTENTABILIDADE EM AÇÃO?
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.producer]}
        onPress={() => navigation.navigate('RegisterType', { role: 'producer', email, nickname })}
      >
        <Text style={styles.buttonText}>EU PRODUZO MATERIAL RECICLÁVEL E QUERO VENDER</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buyer]}
        onPress={() => navigation.navigate('RegisterType', { role: 'coletor', email, nickname })}
      >
        <Text style={styles.buttonText}>EU COLETO MATERIAL RECICLÁVEL E QUERO COMPRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextText}>VAMOS EM FRENTE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4edda',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  back: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 28,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
    lineHeight: 22,
  },
  button: {
    paddingVertical: 22,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 15,
  },
  producer: {
    backgroundColor: COLORS.primary,
  },
  buyer: {
    backgroundColor: '#17a2b8',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 40,
  },
  nextText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});