import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from '../styles/SellOrBuyStyles';

export default function SellOrBuyScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que você deseja fazer?</Text>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TipoDePessoa')}>
        <Image
          source={require('../assets/vender.png')}
          style={styles.image}
        />
        <Text style={styles.optionText}>VENDER</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TipoDePessoa')}>
        <Image
          source={require('../assets/comprar.png')}
          style={styles.image}
        />
        <Text style={styles.optionText}>COMPRAR</Text>
      </TouchableOpacity>
    </View>
  );
}
