import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { formStyles } from '../styles/formStyles';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={formStyles.container}>
      <Text style={formStyles.label}>QUAL SEU E-MAIL?</Text>
      <TextInput
        style={formStyles.input}
        placeholder="exemplo@email.com"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={formStyles.label}>SENHA</Text>
      <TextInput
        style={formStyles.input}
        placeholder="********"
        placeholderTextColor="#999"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={formStyles.button}>
        <Text style={formStyles.buttonText}>ENTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}
