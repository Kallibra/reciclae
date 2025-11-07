// screens/AnunciarMaterial.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AnunciarMaterial({ navigation }) {
  const [materiais, setMateriais] = useState({
    plastico: '', papel: '', metal: '', vidro: '', organico: ''
  });
  const [endereco, setEndereco] = useState('');
  const [observacao, setObservacao] = useState('');

  const anunciar = async () => {
    if (!Object.values(materiais).some(v => v > 0) || !endereco) {
      Alert.alert('Erro', 'Preencha pelo menos um material e o endereço');
      return;
    }

    const anuncio = {
      id: Date.now().toString(),
      materiais,
      endereco,
      observacao,
      status: 'disponivel',
      produtorId: (await AsyncStorage.getItem('userId'))
    };

    const anuncios = JSON.parse(await AsyncStorage.getItem('anuncios') || '[]');
    anuncios.push(anuncio);
    await AsyncStorage.setItem('anuncios', JSON.stringify(anuncios));

    Alert.alert('Sucesso', 'Anúncio publicado! Sucateiros serão notificados.');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Anunciar Material</Text>

      {['plástico', 'papel', 'metal', 'vidro', 'orgânico'].map((tipo, i) => (
        <View key={i} style={styles.inputGroup}>
          <Text style={styles.label}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)} (kg)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={materiais[tipo]}
            onChangeText={v => setMateriais({ ...materiais, [tipo]: v })}
            placeholder="0"
          />
        </View>
      ))}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Endereço completo</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          value={endereco}
          onChangeText={setEndereco}
          placeholder="Rua, número, bairro..."
          multiline
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Observação (opcional)</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={observacao}
          onChangeText={setObservacao}
          placeholder="Ex: Material limpo, embalado..."
          multiline
        />
      </View>

      <TouchableOpacity style={styles.btn} onPress={anunciar}>
        <Text style={styles.btnText}>Publicar Anúncio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginBottom: 20 },
  inputGroup: { marginBottom: 15 },
  label: { fontSize: 16, color: '#333', marginBottom: 5 },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  btn: { backgroundColor: COLORS.primary, padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});