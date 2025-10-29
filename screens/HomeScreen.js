import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Reciclaê!</Text>
      <Text style={styles.subtitle}>Mapa e funcionalidades em desenvolvimento...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#4CAF50' },
  subtitle: { marginTop: 10, color: '#555' },
});
