// screens/RegisterDetails.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import authStyles from '../styles/AuthStyles';

export default function RegisterDetails({ navigation }) {
  const [form, setForm] = useState({
    contato: '',
    nascimento: '',
    cep: '',
    bairro: '',
    cidade: '',
    complemento: '',
    senha: '',
    repetirSenha: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    // Simulação de cadastro concluído
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={authStyles.container}>
      <View style={authStyles.headerContainer}>
        <Text style={authStyles.headerTitle}>CADASTRO</Text>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
          SENSA-CIONAL! UM NOVO VALOR AO MATERIAL E UM VALOR A MAIS PRO SEU BOLSO
        </Text>
        <Text style={{ textAlign: 'center', marginVertical: 10 }}>
          AGORA SÓ PRECISAMOS DE MAIS ALGUMAS INFORMAÇÕES.
        </Text>

        {[
          { key: 'contato', placeholder: 'QUAL SEU CONTATO (não é obrigatório)' },
          { key: 'nascimento', placeholder: 'QUAL SUA DATA DE NASCIMENTO?' },
          { key: 'cep', placeholder: 'QUAL SEU CEP?' },
          { key: 'bairro', placeholder: 'BAIRRO' },
          { key: 'cidade', placeholder: 'CIDADE' },
          { key: 'complemento', placeholder: 'COMPLEMENTO' },
          { key: 'senha', placeholder: 'CRIE UMA SENHA', secure: true },
          { key: 'repetirSenha', placeholder: 'REPITA SUA SENHA', secure: true },
        ].map((field) => (
          <TextInput
            key={field.key}
            placeholder={field.placeholder}
            secureTextEntry={field.secure}
            style={authStyles.inputField}
            value={form[field.key]}
            onChangeText={(v) => handleChange(field.key, v)}
          />
        ))}

        <TouchableOpacity style={[authStyles.mainButton, { marginTop: 30 }]} onPress={handleSubmit}>
          <Text style={authStyles.mainButtonText}>FINALIZAR CADASTRO</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
