// screens/PoliticaPrivacidade.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../../styles/colors';

export default function PoliticaPrivacidade() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Política de Privacidade</Text>
      <Text style={styles.text}>
        Aqui vai o texto da política...
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginBottom: 20 },
  text: { fontSize: 16, lineHeight: 24, color: '#333' },
});