// screens/RecuperarSenhaScreen.js → VERSÃO PROFISSIONAL COM CÓDIGO DE VERIFICAÇÃO
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../styles/colors';

export default function RecuperarSenhaScreen({ navigation }) {
  const [etapa, setEtapa] = useState(1); // 1 = email, 2 = código, 3 = nova senha
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [codigoEnviado, setCodigoEnviado] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  // Timer de 60 segundos pra reenvio
  useEffect(() => {
    if (etapa === 2 && timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [etapa, timer]);

  const gerarCodigo = () => Math.floor(100000 + Math.random() * 900000).toString();

  const enviarCodigo = async () => {
    if (!email) {
      Alert.alert('Ops!', 'Digite seu email');
      return;
    }

    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem('user');
      if (!userData) {
        Alert.alert('Erro', 'Nenhum usuário cadastrado com este email.');
        setLoading(false);
        return;
      }

      const user = JSON.parse(userData);
      if (user.email !== email) {
        Alert.alert('Erro', 'Email não encontrado.');
        setLoading(false);
        return;
      }

      const novoCodigo = gerarCodigo();
      setCodigoEnviado(novoCodigo);
      await AsyncStorage.setItem('codigoRecuperacao', novoCodigo);
      await AsyncStorage.setItem('emailRecuperacao', email);

      setEtapa(2);
      setTimer(60);
      Alert.alert(
        'Código enviado!',
        `Enviamos um código de 6 dígitos para ${email}\n\nCódigo (simulação): ${novoCodigo}`,
        [{ text: 'OK' }]
      );
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível enviar o código.');
    } finally {
      setLoading(false);
    }
  };

  const verificarCodigo = async () => {
    if (codigo.length !== 6) {
      Alert.alert('Erro', 'Digite os 6 dígitos');
      return;
    }

    const codigoSalvo = await AsyncStorage.getItem('codigoRecuperacao');
    if (codigo !== codigoSalvo) {
      Alert.alert('Código inválido', 'O código digitado está errado.');
      return;
    }

    setEtapa(3);
  };

  const salvarNovaSenha = async () => {
    if (novaSenha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    if (novaSenha.length < 6) {
      Alert.alert('Senha fraca', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      const userAtualizado = { ...user, password: novaSenha };

      await AsyncStorage.setItem('user', JSON.stringify(userAtualizado));
      await AsyncStorage.removeItem('codigoRecuperacao');
      await AsyncStorage.removeItem('emailRecuperacao');

      Alert.alert(
        'Senha alterada com sucesso! 🎉',
        'Você já pode fazer login com a nova senha.',
        [{ text: 'Beleza!', onPress: () => navigation.replace('Auth') }]
      );
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível salvar a nova senha.');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.header}>
        <Icon name="shield-checkmark" size={80} color={COLORS.primary} />
        <Text style={styles.title}>Recuperar Senha</Text>
      </View>

      {/* ETAPA 1 - EMAIL */}
      {etapa === 1 && (
        <View style={styles.form}>
          <Text style={styles.subtitle}>Digite seu email cadastrado</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.botao} onPress={enviarCodigo} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Enviar Código</Text>}
          </TouchableOpacity>
        </View>
      )}

      {/* ETAPA 2 - CÓDIGO */}
      {etapa === 2 && (
        <View style={styles.form}>
          <Text style={styles.subtitle}>Digite o código de 6 dígitos</Text>
          <Text style={styles.info}>Enviamos para {email}</Text>
          <TextInput
            style={styles.inputCodigo}
            placeholder="000000"
            keyboardType="numeric"
            maxLength={6}
            value={codigo}
            onChangeText={setCodigo}
          />
          <TouchableOpacity style={styles.botao} onPress={verificarCodigo}>
            <Text style={styles.botaoTexto}>Verificar Código</Text>
          </TouchableOpacity>
          <Text style={styles.timer}>
            Reenviar em {timer}s {timer === 0 && (
              <Text onPress={enviarCodigo} style={styles.reenviar}> · Reenviar</Text>
            )}
          </Text>
        </View>
      )}

      {/* ETAPA 3 - NOVA SENHA */}
      {etapa === 3 && (
        <View style={styles.form}>
          <Text style={styles.subtitle}>Crie uma nova senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Nova senha"
            secureTextEntry
            value={novaSenha}
            onChangeText={setNovaSenha}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar nova senha"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
          <TouchableOpacity style={styles.botao} onPress={salvarNovaSenha}>
            <Text style={styles.botaoTexto}>Salvar Nova Senha</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.voltar} onPress={() => navigation.replace('Auth')}>
        <Icon name="arrow-back" size={24} color={COLORS.primary} />
        <Text style={styles.voltarTexto}>Voltar para o login</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 30 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', color: COLORS.primary, marginTop: 20 },
  subtitle: { fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 10 },
  info: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  form: { width: '100%' },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputCodigo: {
    backgroundColor: '#f5f5f5',
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 8,
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  botao: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  timer: { textAlign: 'center', marginTop: 20, color: '#666', fontSize: 14 },
  reenviar: { color: COLORS.primary, fontWeight: 'bold' },
  voltar: { flexDirection: 'row', alignItems: 'center', marginTop: 40, justifyContent: 'center' },
  voltarTexto: { color: COLORS.primary, marginLeft: 8, fontSize: 16 },
});