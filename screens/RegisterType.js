// screens/RegisterType.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export default function RegisterType({ navigation, route }) {
  const { role, nickname, email } = route.params || {};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{"<"}</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>CADASTRO</Text>
        </View>
      </View>

      <Text style={styles.question}>
        VOCÊ VAI SE CADASTRAR COMO UMA PESSOA FÍSICA OU JURÍDICA?
      </Text>

      <TouchableOpacity
        style={[styles.button, styles.pf]}
        onPress={() => navigation.navigate('FinalizarCadastro', { role, type: 'PF', email, nickname })}
      >
        <Text style={styles.buttonText}>VOU ME CADASTRAR COMO UMA PESSOA FÍSICA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.pj]}
        onPress={() => navigation.navigate('FinalizarCadastro', { role, type: 'PJ', email, nickname })}
      >
        <Text style={styles.buttonText}>QUERO ME CADASTRAR COMO UMA PESSOA JURÍDICA</Text>
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
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  question: {
    fontSize: 18,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
  },
  button: {
    paddingVertical: 22,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 15,
  },
  pf: {
    backgroundColor: '#28a745',
  },
  pj: {
    backgroundColor: '#007bff',
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