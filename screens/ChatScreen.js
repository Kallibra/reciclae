// screens/ChatScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons'; // ← ESSA LINHA!
import { COLORS } from '../styles/colors'; // ← JÁ TINHA, TÁ CERTO

export default function ChatScreen({ route, navigation }) {
  const { anuncio } = route.params;
  const [mensagem, setMensagem] = useState('');
  const [chat, setChat] = useState([]);

  const enviar = async () => {
    if (!mensagem.trim()) return;
    const nova = { texto: mensagem, de: 'sucateiro', hora: new Date().toLocaleTimeString() };
    setChat([...chat, nova]);
    setMensagem('');

    // Simula resposta do produtor
    setTimeout(() => {
      setChat(prev => [...prev, { texto: 'Beleza, pode vir amanhã 14h?', de: 'produtor', hora: new Date().toLocaleTimeString() }]);
    }, 1000);
  };

  const gerarCodigo = () => {
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    Alert.alert('Código Gerado', `Envie ao produtor: ${codigo}\nVálido por 10 minutos`);
    // Salvar código no AsyncStorage com produtorId + validade
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.nome}>Chat com Produtor</Text>
        <TouchableOpacity onPress={gerarCodigo} style={styles.codigoBtn}>
          <Text style={styles.codigoText}>Gerar Código</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.messages}>
        {chat.map((m, i) => (
          <View key={i} style={[styles.bubble, m.de === 'sucateiro' ? styles.minha : styles.outro]}>
            <Text style={styles.texto}>{m.texto}</Text>
            <Text style={styles.hora}>{m.hora}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={mensagem}
          onChangeText={setMensagem}
          placeholder="Digite uma mensagem..."
        />
        <TouchableOpacity onPress={enviar} style={styles.sendBtn}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#eee' },
  nome: { fontWeight: 'bold', fontSize: 16 },
  codigoBtn: { backgroundColor: COLORS.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  codigoText: { color: '#fff', fontWeight: '600' },
  messages: { flex: 1, padding: 10 },
  bubble: { maxWidth: '80%', padding: 10, borderRadius: 12, marginVertical: 5 },
  minha: { alignSelf: 'flex-end', backgroundColor: COLORS.primary },
  outro: { alignSelf: 'flex-start', backgroundColor: '#e9ecef' },
  texto: { color: '#fff' }, hora: { fontSize: 10, color: '#ddd', marginTop: 4 },
  inputArea: { flexDirection: 'row', padding: 10, backgroundColor: '#fff' },
  input: { flex: 1, backgroundColor: '#f1f1f1', padding: 12, borderRadius: 20, marginRight: 10 },
  sendBtn: { backgroundColor: COLORS.primary, padding: 12, borderRadius: 20, justifyContent: 'center' },
});