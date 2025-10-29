// screens/RegisterType.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import authStyles from '../styles/AuthStyles';

export default function RegisterType({ navigation, route }) {
  const { nome, role } = route.params || {};
  const [tipo, setTipo] = useState(null);

  return (
    <View style={authStyles.container}>
      <View style={authStyles.headerContainer}>
        <Text style={authStyles.headerTitle}>CADASTRO</Text>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>
          VOCÊ VAI SE CADASTRAR COMO UMA PESSOA FÍSICA OU JURÍDICA?
        </Text>

        <TouchableOpacity
          style={[
            authStyles.mainButton,
            { backgroundColor: tipo === 'fisica' ? '#2E7D32' : '#A5D6A7' },
          ]}
          onPress={() => setTipo('fisica')}
        >
          <Text style={authStyles.mainButtonText}>VOU ME CADASTRAR COMO UMA PESSOA FÍSICA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            authStyles.mainButton,
            { backgroundColor: tipo === 'juridica' ? '#1565C0' : '#90CAF9' },
          ]}
          onPress={() => setTipo('juridica')}
        >
          <Text style={authStyles.mainButtonText}>QUERO ME CADASTRAR COMO UMA PESSOA JURÍDICA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[authStyles.mainButton, { marginTop: 30 }]}
          disabled={!tipo}
          onPress={() => navigation.navigate('RegisterDetails', { nome, role, tipo })}
        >
          <Text style={authStyles.mainButtonText}>VAMOS EM FRENTE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
