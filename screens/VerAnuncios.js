// screens/VerAnuncios.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function VerAnuncios({ navigation }) {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    loadAnuncios();
    const interval = setInterval(loadAnuncios, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadAnuncios = async () => {
    const data = await AsyncStorage.getItem('anuncios');
    if (data) setAnuncios(JSON.parse(data).filter(a => a.status === 'disponivel'));
  };

  const iniciarChat = (anuncio) => {
    navigation.navigate('Chat', { anuncio });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.endereco}>{item.endereco}</Text>
      <Text style={styles.materiais}>
        {Object.entries(item.materiais)
          .filter(([_, qtd]) => qtd > 0)
          .map(([tipo, qtd]) => `${qtd}kg ${tipo}`)
          .join(' • ')}
      </Text>
      {item.observacao ? <Text style={styles.obs}>Obs: {item.observacao}</Text> : null}
      <TouchableOpacity style={styles.chatBtn} onPress={() => iniciarChat(item)}>
        <Icon name="chatbubble" size={20} color="#fff" />
        <Text style={styles.chatText}>Iniciar Chat</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Anúncios Próximos</Text>
      <FlatList
        data={anuncios}
        renderItem={renderItem}
        keyExtractor={i => i.id}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum anúncio disponível</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingTop: 50 },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginBottom: 15 },
  card: { backgroundColor: '#fff', margin: 15, padding: 15, borderRadius: 12, elevation: 3 },
  endereco: { fontSize: 16, fontWeight: '600' },
  materiais: { color: '#666', marginVertical: 8 },
  obs: { color: '#888', fontStyle: 'italic', marginBottom: 10 },
  chatBtn: { flexDirection: 'row', backgroundColor: COLORS.primary, padding: 10, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  chatText: { color: '#fff', marginLeft: 8, fontWeight: '600' },
  empty: { textAlign: 'center', color: '#666', marginTop: 50 },
});