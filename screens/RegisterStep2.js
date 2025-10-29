// screens/RegisterStep2.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import authStyles from '../styles/AuthStyles';

export default function RegisterStep2({ navigation, route }) {
  const { nome } = route.params || {};
  const [role, setRole] = useState(null);

  return (
    <View style={authStyles.container}>
      {/* Cabeçalho */}
      <View style={authStyles.headerContainer}>
        <Text style={authStyles.headerTitle}>CADASTRO</Text>
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
          PRAZER EM TE CONHECER {nome ? nome.toUpperCase() : '[NOME]'}!
        </Text>
        <Text style={{ textAlign: 'center', marginVertical: 10 }}>
          ME CONTA: COMO VOCÊ COLOCA A TAL PRÁTICA DE SUSTENTABILIDADE EM AÇÃO?
        </Text>

        {/* Botões de escolha */}
        <TouchableOpacity
          style={[
            authStyles.mainButton,
            { backgroundColor: role === 'vendedor' ? '#2E7D32' : '#A5D6A7' },
          ]}
          onPress={() => setRole('vendedor')}
        >
          <Text style={authStyles.mainButtonText}>EU PRODUZO MATERIAL RECICLÁVEL E QUERO VENDER</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            authStyles.mainButton,
            { backgroundColor: role === 'comprador' ? '#1565C0' : '#90CAF9' },
          ]}
          onPress={() => setRole('comprador')}
        >
          <Text style={authStyles.mainButtonText}>EU COLETO MATERIAL RECICLÁVEL E QUERO COMPRAR</Text>
        </TouchableOpacity>

        {/* Botão de avanço */}
        <TouchableOpacity
          style={[authStyles.mainButton, { marginTop: 30 }]}
          disabled={!role}
          onPress={() => navigation.navigate('RegisterType', { nome, role })}
        >
          <Text style={authStyles.mainButtonText}>VAMOS EM FRENTE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
