// screens/perfil/EditarPerfilScreen.js — VERSÃO FINAL: salva e carrega dados reais
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../styles/colors';

export default function EditarPerfilScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');

  // Carrega dados salvos quando abre a tela
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const dados = JSON.parse(user);
        setNome(dados.nome || '');
        setApelido(dados.nickname || '');
        setTelefone(dados.telefone || '');
        setEndereco(dados.endereco || '');
      }
    } catch (e) {
      console.log('Erro ao carregar dados:', e);
    }
  };

  const salvar = async () => {
    if (!nome || !apelido) {
      Alert.alert('Ops!', 'Nome e apelido são obrigatórios!');
      return;
    }

    const dadosAtualizados = {
      nome,
      nickname: apelido,
      telefone,
      endereco,
      role: 'producer', // ou 'coletor' conforme o cadastro
    };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(dadosAtualizados));
      Alert.alert('Sucesso! 🎉', 'Perfil atualizado com sucesso!', [
        { text: 'Beleza!', onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Icon name="arrow-back" size={28} color={COLORS.primary} onPress={() => navigation.goBack()} />
          <Text style={styles.title}>Editar Perfil</Text>
          <Pressable onPress={salvar}>
            <Text style={styles.save}>Salvar</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Seu nome" />

          <Text style={styles.label}>Apelido (como aparece no app)</Text>
          <TextInput style={styles.input} value={apelido} onChangeText={setApelido} placeholder="Ex: Kallibra" />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            value={telefone}
            onChangeText={setTelefone}
            placeholder="(91) 99999-9999"
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>Endereço completo</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            value={endereco}
            onChangeText={setEndereco}
            placeholder="Rua, número, bairro, cidade"
            multiline
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    elevation: 4,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
  save: { fontSize: 18, color: COLORS.primary, fontWeight: 'bold' },
  content: { padding: 20 },
  label: { fontSize: 16, color: '#555', marginBottom: 8, fontWeight: '600' },
  input: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});