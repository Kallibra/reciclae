// screens/perfil/EditarPerfilScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp, wp, moderateScale } from '../../utils/scale';
import { COLORS } from '../../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EditarPerfilScreen({ navigation }) {
  const [nome, setNome] = useState('Kallibra');

  const salvar = () => {
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso! 🎉');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={moderateScale(28)} color={COLORS.primary} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Editar Perfil</Text>
        <Pressable onPress={salvar}>
          <Text style={styles.save}>Salvar</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome completo" />
        <TextInput style={styles.input} placeholder="Telefone" keyboardType="phone-pad" />
        <TextInput style={styles.input} placeholder="Endereço completo" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: moderateScale(20) },
  title: { fontSize: moderateScale(22), fontWeight: 'bold', color: COLORS.primary },
  save: { fontSize: moderateScale(18), color: COLORS.primary, fontWeight: 'bold' },
  content: { padding: moderateScale(20) },
  input: { backgroundColor: '#fff', padding: moderateScale(16), borderRadius: 12, marginBottom: hp(2), fontSize: moderateScale(16) },
});