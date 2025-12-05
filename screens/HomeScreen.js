// screens/HomeScreen.js — VERSÃO DE EMERGÊNCIA (NUNCA CRASHA!)
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { COLORS } from '../styles/colors';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ReciclAÊ - Mapa de Belém</Text>
      
      <Image
        source={{ uri: 'https://i.ibb.co.com/0jZ3YkP/mapa-belem-reciclae-estatico.jpg' }}
        style={styles.mapa}
        resizeMode="contain"
      />

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Sucatarias próximas</Text>
        <Text style={styles.item}>• Sucata do Pará - Av. Almirante Barroso</Text>
        <Text style={styles.item}>• Recicla Belém - Tv. 14 de Março</Text>
        <Text style={styles.item}>• EcoMetal - Av. José Bonifácio</Text>
        <Text style={styles.item}>• Sucataria Guamá - Rua dos Mundurucus</Text>
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Nível de reciclagem</Text>
        <Text style={styles.item}>🟢 Guamá - 87%</Text>
        <Text style={styles.item}>🟢 Nazaré - 92%</Text>
        <Text style={styles.item}>🟡 Marco - 74%</Text>
        <Text style={styles.item}>🔴 Batista Campos - 38%</Text>
      </View>

      <Text style={styles.aviso}>Mapa interativo em desenvolvimento — versão completa em breve!</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  title: { fontSize: 26, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', margin: 20 },
  mapa: { width: '100%', height: 500 },
  info: { padding: 20 },
  infoTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  item: { fontSize: 16, marginVertical: 4 },
  legend: { padding: 20, backgroundColor: '#fff', margin: 20, borderRadius: 12 },
  legendTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  aviso: { textAlign: 'center', color: '#666', fontStyle: 'italic', padding: 20 },
});