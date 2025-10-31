// screens/RegisterForm.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export default function RegisterForm({ navigation }) {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="QUAL SEU NOME COMPLETO?"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="COMO PODEMOS LHE CHAMAR (APELIDO)?"
        placeholderTextColor="#aaa"
        value={nickname}
        onChangeText={setNickname}
      />
      <TextInput
        style={styles.input}
        placeholder="QUAL SEU MELHOR E-MAIL?"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RegisterType')}>
        <Text style={styles.buttonText}>VAMOS CONTINUAR?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 14,
    marginBottom: 15, 
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});