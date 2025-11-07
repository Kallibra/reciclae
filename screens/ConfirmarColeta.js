// screens/ConfirmarColeta.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';

export default function ConfirmarColeta({ navigation }) {
  const [codigo, setCodigo] = useState('');

  const confirmar = async () => {
    // Simulação: código válido = 123456
    if (codigo === '123456') {
      const coleta = {
        id: Date.now().toString(),
        data: '08/11', hora: '14:00',
        materiais: ['10kg plástico', '5kg papel'],
        endereco: 'Rua X, 123',
        status: 'pendente'
      };
      const coletas = JSON.parse(await AsyncStorage.getItem('coletas') || '[]');
      coletas.push(coleta);
      await AsyncStorage.setItem('coletas', JSON.stringify(coletas));
      Alert.alert('Sucesso', 'Coleta agendada com sucesso!');
      navigation.navigate('Agenda');
    } else {
      Alert.alert('Erro', 'Código inválido ou expirado');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmar Coleta</Text>
      <Text style={styles.subtitle}>Digite o código recebido do sucateiro</Text>
      <TextInput
        style={styles.input}
        value={codigo}
        onChangeText={setCodigo}
        placeholder="000000"
        keyboardType="numeric"
        maxLength={6}
      />
      <TouchableOpacity style={styles.btn} onPress={confirmar}>
        <Text style={styles.btnText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginBottom: 10 },
  subtitle: { color: '#666', marginBottom: 30, textAlign: 'center' },
  input: { backgroundColor: '#fff', width: '80%', padding: 15, borderRadius: 12, textAlign: 'center', fontSize: 20, letterSpacing: 5, borderWidth: 1, borderColor: '#ddd' },
  btn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 12, width: '80%', alignItems: 'center', marginTop: 30 },
  btnText: { color: '#fff', fontWeight: 'bold' },
});