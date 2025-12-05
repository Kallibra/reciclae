// screens/AnunciarMaterial.js → VERSÃO FINAL LINDONA E FUNCIONAL
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../styles/colors';

export default function AnunciarMaterial({ navigation }) {
  const [materiais, setMateriais] = useState({
    plastico: '',
    papel: '',
    metal: '',
    vidro: '',
    organico: '',
  });
  const [endereco, setEndereco] = useState('');
  const [observacao, setObservacao] = useState('');
  const [loading, setLoading] = useState(false);
  const [anunciando, setAnunciando] = useState(false);

  // Preenche endereço automaticamente
  useEffect(() => {
    const carregarEndereco = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const dados = JSON.parse(user);
        if (dados.endereco) setEndereco(dados.endereco);
      }
    };
    carregarEndereco();
  }, []);

  const pegarEnderecoAtual = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setEndereco('Endereço não permitido');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      const enderecoCompleto = await Location.reverseGeocodeAsync({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      const rua = enderecoCompleto[0]?.street || '';
      const numero = enderecoCompleto[0]?.name || '';
      const bairro = enderecoCompleto[0]?.district || enderecoCompleto[0]?.subregion || '';
      const cidade = enderecoCompleto[0]?.city || 'Belém';

      setEndereco(`${rua ? rua + ', ' : ''}${numero} - ${bairro}, ${cidade}`);
    } catch {
      setEndereco('Não foi possível pegar seu endereço');
    } finally {
      setLoading(false);
    }
  };

  const anunciar = () => {
    const total = Object.values(materiais).reduce((acc, val) => acc + (parseFloat(val) || 0), 0);

    if (total === 0) {
      Alert.alert('Ops!', 'Você precisa informar pelo menos um material.');
      return;
    }

    setAnunciando(true);
    setTimeout(() => {
      Alert.alert(
        'Anunciado com sucesso! ♻️',
        'Os sucateiros já estão vendo seu material!\nEm breve alguém vai te buscar.',
        [
          {
            text: 'Beleza!',
            onPress: () => {
              setAnunciando(false);
              // ← AQUI É A LINHA QUE RESOLVE TUDO
              navigation.navigate('Main', { screen: 'HomeTab' });
              // ou se você nomeou diferente, pode ser 'HomeScreen' ou 'Inicio'
            },
          },
        ]
      );
      setAnunciando(false);
    }, 1500);
  };

  const categorias = [
    { nome: 'Plástico', key: 'plastico', icon: 'delete', color: '#e74c3c' },
    { nome: 'Papel/Papelão', key: 'papel', icon: 'description', color: '#3498db' },
    { nome: 'Metal', key: 'metal', icon: 'build', color: '#95a5a6' },
    { nome: 'Vidro', key: 'vidro', icon: 'local-bar', color: '#27ae60' },
    { nome: 'Orgânico', key: 'organico', icon: 'spa', color: '#8e44ad' },
  ];

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        
        {/* Header lindo */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://i.ibb.co.com/3h9Z7nY/reciclagem-pilha-materiais.jpg' }}
            style={styles.imagem}
            resizeMode="cover"
          />
          <View style={styles.overlay}>
            <Text style={styles.title}>Anunciar Material</Text>
            <Text style={styles.subtitle}>Ganhe dinheiro reciclando!</Text>
          </View>
        </View>

        {/* Materiais */}
        {categorias.map((cat) => (
          <View key={cat.key} style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name={cat.icon} size={28} color={cat.color} />
              <Text style={styles.cardTitle}>{cat.nome}</Text>
            </View>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Quantos kg?"
              value={materiais[cat.key]}
              onChangeText={(text) => setMateriais({ ...materiais, [cat.key]: text })}
            />
          </View>
        ))}

        {/* Endereço */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="location-on" size={28} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Endereço para coleta</Text>
          </View>
          {loading ? (
            <ActivityIndicator color={COLORS.primary} />
          ) : (
            <TextInput
              style={[styles.input, { color: '#666' }]}
              value={endereco}
              onChangeText={setEndereco}
              placeholder="Seu endereço aparecerá aqui..."
            />
          )}
        </View>

        {/* Observação */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="chat-bubble-outline" size={28} color="#f39c12" />
            <Text style={styles.cardTitle}>Observação (opcional)</Text>
          </View>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ex: Material limpo, separado em sacos..."
            multiline
            numberOfLines={4}
            value={observacao}
            onChangeText={setObservacao}
          />
        </View>

        {/* Botão anunciar */}
        <TouchableOpacity style={[styles.botaoAnunciar, anunciando && styles.botaoAnunciando]} onPress={anunciar} disabled={anunciando}>
          {anunciando ? (
            <ActivityIndicator color="#fff" size="large" />
          ) : (
            <>
              <Icon name="recycling" size={28} color="#fff" />
              <Text style={styles.botaoTexto}>ANUNCIAR MATERIAL</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { height: 220, position: 'relative', marginBottom: 20 },
  imagem: { width: '100%', height: '100%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 18, color: '#fff', marginTop: 8, opacity: 0.9 },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 18,
    borderRadius: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardTitle: { fontSize: 17, fontWeight: 'bold', marginLeft: 12, color: '#333' },

  input: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 14,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  textArea: { height: 100, textAlignVertical: 'top' },

  botaoAnunciar: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginTop: 20,
    padding: 18,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  botaoAnunciando: { opacity: 0.8 },
  botaoTexto: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 12 },
});