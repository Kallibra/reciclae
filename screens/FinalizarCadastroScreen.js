// screens/FinalizarCadastroScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';

// Funções de máscara
const formatPhone = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

const formatDate = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})\/(\d{2})(\d)/, '$1/$2/$3')
    .replace(/\/\d{4}$/, (match) => match);
};

const formatCEP = (value) => {
  return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{3})\d+?$/, '$1');
};

export default function FinalizarCadastroScreen({ navigation, route }) {
  const { role, type, nickname, email } = route.params || {};

  const [contact, setContact] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [complemento, setComplemento] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [loading, setLoading] = useState(false);

  // Busca endereço pelo CEP
  const buscarCEP = async (cepLimpo) => {
    if (cepLimpo.length !== 8) return;

    setLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setBairro(data.bairro || '');
        setCidade(data.localidade || '');
        setUf(data.uf || '');
      } else {
        Alert.alert('CEP não encontrado', 'Verifique o CEP digitado');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o endereço');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      buscarCEP(cepLimpo);
    }
  }, [cep]);

  const handleRegister = async () => {
    Keyboard.dismiss();

    if (!contact && !Alert.alert('Atenção', 'O contato é recomendado. Deseja continuar sem?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => salvarCadastro() },
    ])) return;

    if (!birthDate || birthDate.length !== 10) {
      Alert.alert('Erro', 'Preencha a data de nascimento corretamente (dd/mm/aaaa)');
      return;
    }

    if (!cep || cep.length !== 9) {
      Alert.alert('Erro', 'Preencha o CEP corretamente');
      return;
    }

    if (!password || !confirmPassword) {
      Alert.alert('Erro', 'Preencha as senhas');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 8 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (!bairro || !cidade) {
      Alert.alert('Erro', 'Preencha bairro e cidade (ou verifique o CEP)');
      return;
    }

    salvarCadastro();
  };

  const salvarCadastro = async () => {
    try {
      const userData = {
        email,
        password,
        nickname,
        role, // 'producer' ou 'coletor'
        type, // 'PF' ou 'PJ'
        contact: contact.replace(/\D/g, ''),
        birthDate,
        cep: cep.replace(/\D/g, ''),
        bairro,
        cidade,
        uf,
        complemento,
        registeredAt: new Date().toISOString(),
      };

      await AsyncStorage.setItem('user', JSON.stringify(userData));

      Alert.alert('Sucesso! ♻️', `Cadastro concluído, ${nickname}! Bem-vindo ao futuro da reciclagem!`, [
        { text: 'Vamos reciclar!', onPress: () => navigation.navigate('Main', { screen: 'HomeTab' }) },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar cadastro');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>{"<"}</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>CADASTRO</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        FALTAM SÓ ALGUNS DETALHES PRA VOCÊ COMEÇAR A GANHAR DINHEIRO RECICLANDO!
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="SEU CELULAR (com DDD)"
          value={contact}
          onChangeText={(text) => setContact(formatPhone(text))}
          keyboardType="phone-pad"
          maxLength={15}
        />

        <TextInput
          style={styles.input}
          placeholder="DATA DE NASCIMENTO (dd/mm/aaaa)"
          value={birthDate}
          onChangeText={(text) => setBirthDate(formatDate(text))}
          keyboardType="numeric"
          maxLength={10}
        />

        <TextInput
          style={styles.input}
          placeholder="SEU CEP"
          value={cep}
          onChangeText={(text) => setCep(formatCEP(text))}
          keyboardType="numeric"
          maxLength={9}
        />
        {loading && <ActivityIndicator color={COLORS.primary} style={{ marginVertical: 5 }} />}

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.half]}
            placeholder="BAIRRO"
            value={bairro}
            onChangeText={setBairro}
            editable={!loading}
          />
          <TextInput
            style={[styles.input, styles.half]}
            placeholder="CIDADE"
            value={cidade}
            onChangeText={setCidade}
            editable={!loading}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="COMPLEMENTO (opcional)"
          value={complemento}
          onChangeText={setComplemento}
        />

        <TouchableOpacity onPress={() => setShowTips(true)}>
          <Text style={styles.tipLink}>DICA DE SENHA FORTE</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="CRIE UMA SENHA (mín. 8 caracteres)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="CONFIRME SUA SENHA"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>FINALIZAR CADASTRO</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de dicas de senha */}
      <Modal visible={showTips} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>DICAS PARA SENHA FORTE</Text>
            <Text style={styles.modalText}>• Mínimo 8 caracteres</Text>
            <Text style={styles.modalText}>• Letras maiúsculas e minúsculas</Text>
            <Text style={styles.modalText}>• Pelo menos 1 número</Text>
            <Text style={styles.modalText}>• Use símbolos: ! @ # $ % &</Text>
            <Text style={styles.modalText}>• Evite datas de nascimento</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setShowTips(false)}>
              <Text style={styles.closeText}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4edda',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  back: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backText: {
    fontSize: 32,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  badge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 25,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  form: {
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    width: '48%',
  },
  tipLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 10,
    marginTop: -5,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  closeBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});