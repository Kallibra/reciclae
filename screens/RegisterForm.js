import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { formStyles } from '../styles/formStyles';

export default function RegisterForm() {
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View style={formStyles.container}>
      <Text style={formStyles.label}>QUAL O SEU NOME COMPLETO?</Text>
      <TextInput
        style={formStyles.input}
        placeholder="Ex: Maria Silva"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={formStyles.label}>COMO PODEMOS LHE CHAMAR (APELIDO)?</Text>
      <TextInput
        style={formStyles.input}
        placeholder="Ex: Mari"
        placeholderTextColor="#999"
        value={apelido}
        onChangeText={setApelido}
      />

      <Text style={formStyles.label}>QUAL SEU MELHOR E-MAIL?</Text>
      <TextInput
        style={formStyles.input}
        placeholder="exemplo@email.com"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={formStyles.button}>
        <Text style={formStyles.buttonText}>PRÓXIMO</Text>
      </TouchableOpacity>
    </View>
  );
}
