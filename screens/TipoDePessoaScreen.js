import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/TipoDePessoaStyles';

export default function TipoDePessoaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Você é...</Text>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('FinalizarCadastro')}
      >
        <Image
          source={require('../assets/pessoa_fisica.png')}
          style={styles.image}
        />
        <Text style={styles.optionText}>PESSOA FÍSICA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('FinalizarCadastro')}
      >
        <Image
          source={require('../assets/pessoa_juridica.png')}
          style={styles.image}
        />
        <Text style={styles.optionText}>PESSOA JURÍDICA</Text>
      </TouchableOpacity>
    </View>
  );
}
