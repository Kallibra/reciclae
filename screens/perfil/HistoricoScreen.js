// screens/perfil/HistoricoScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { hp, moderateScale } from '../../utils/scale';
import { COLORS } from '../../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HistoricoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={moderateScale(28)} color={COLORS.primary} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Histórico de Coletas</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: moderateScale(20) }}>
        <Text style={styles.empty}>Nenhuma coleta realizada ainda</Text>
        <Text style={styles.subtitle}>Comece a reciclar e veja seu impacto aqui! ♻️</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: moderateScale(20) },
  title: { fontSize: moderateScale(22), fontWeight: 'bold', color: COLORS.primary },
  empty: { fontSize: moderateScale(18), textAlign: 'center', marginTop: hp(20), color: '#666' },
  subtitle: { fontSize: moderateScale(16), textAlign: 'center', marginTop: hp(2), color: '#888' },
});