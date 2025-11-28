// screens/AnunciarMaterial.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { wp, hp, moderateScale } from '../utils/scale';
import { COLORS } from '../styles/colors';

export default function AnunciarMaterial({ navigation }) {
  const [materiais, setMateriais] = useState({
    plastico: '', papel: '', metal: '', vidro: '', organico: ''
  });

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: hp(10) }}>
        <Text style={styles.title}>Anunciar Material</Text>

        {['Plástico', 'Papel', 'Metal', 'Vidro', 'Orgânico'].map((item, index) => {
          const key = item.toLowerCase().replace('ô', 'o');
          return (
            <View key={index} style={styles.inputContainer}>
              <Text style={styles.label}>{item} (kg)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={materiais[key]}
                onChangeText={(text) => setMateriais({ ...materiais, [key]: text })}
                placeholder="0"
              />
            </View>
          );
        })}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Endereço completo</Text>
          <TextInput style={styles.input} placeholder="Rua, número, bairro..." />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Observação (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ex: Material limpo, embalado..."
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Anunciar Material</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp(5),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginVertical: hp(3),
  },
  inputContainer: {
    marginBottom: hp(2.5),
  },
  label: {
    fontSize: moderateScale(16),
    color: '#333',
    marginBottom: hp(1),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: moderateScale(14),
    fontSize: moderateScale(16),
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: hp(12),
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: moderateScale(16),
    borderRadius: 12,
    alignItems: 'center',
    marginTop: hp(4),
  },
  buttonText: {
    color: '#fff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
});