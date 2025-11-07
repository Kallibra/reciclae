// screens/FinalizarCadastroScreen.js
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { COLORS } from '../styles/colors';

export default function FinalizarCadastroScreen({ navigation, route }) {
  const { role, type, nickname, email } = route.params || {};

  const [contact, setContact] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cep, setCep] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [complemento, setComplemento] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showTips, setShowTips] = useState(false);

const handleRegister = async () => {
  if (!contact || !birthDate || !cep || !password || !confirmPassword) {
    Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
    return;
  }
  if (password.length < 8) {
    Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres');
    return;
  }
  if (password !== confirmPassword) {
    Alert.alert('Erro', 'As senhas não coincidem');
    return;
  }

  try {
    // SALVA O USUÁRIO NO CELULAR
    await AsyncStorage.setItem('user', JSON.stringify({
      email: route.params.email,     // ← AQUI ESTAVA FALTANDO!
      password: password,
      nickname: route.params.nickname,
      role: role,
      type: type,
      bairro: 'Ananindeua',
    }));

    Alert.alert('Sucesso!', 'Cadastro concluído com sucesso!', [
      { text: 'OK', onPress: () => navigation.navigate('Auth') }
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
        SENSACIONAL! UM NOVO VALOR AO MATERIAL E UM VALOR A MAIS PRO SEU BOLSO AGORA SÓ PRECISAMOS DE ALGUMAS INFORMAÇÕES.
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="QUAL SEU CONTATO (não obrigatório)"
          value={contact}
          onChangeText={setContact}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="QUAL SUA DATA DE NASCIMENTO?"
          value={birthDate}
          onChangeText={setBirthDate}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="QUAL SEU CEP?"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.half]}
            placeholder="BAIRRO"
            value={bairro}
            onChangeText={setBairro}
          />
          <TextInput
            style={[styles.input, styles.half]}
            placeholder="CIDADE"
            value={cidade}
            onChangeText={setCidade}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="COMPLEMENTO"
          value={complemento}
          onChangeText={setComplemento}
        />

        <TouchableOpacity onPress={() => setShowTips(true)}>
          <Text style={styles.tipLink}>DICA DE SENHA FORTE</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="CRIE UMA SENHA"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="REPITA SUA SENHA"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>FINALIZAR CADASTRO</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL DE DICAS */}
      <Modal visible={showTips} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>DICAS DE SENHA FORTE</Text>
            <Text style={styles.modalText}>• Mínimo 8 caracteres</Text>
            <Text style={styles.modalText}>• Use letras maiúsculas e minúsculas</Text>
            <Text style={styles.modalText}>• Inclua números e símbolos (!@#$)</Text>
            <Text style={styles.modalText}>• Evite datas ou nomes óbvios</Text>
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
  },
  backText: {
    fontSize: 28,
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
    marginBottom: 20,
    fontWeight: 'bold',
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    textAlign: 'left',
    width: '100%',
  },
  closeBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 15,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});