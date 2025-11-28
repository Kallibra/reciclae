// screens/perfil/PoliticaPrivacidadeScreen.js
import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { hp, moderateScale } from '../../utils/scale';
import { COLORS } from '../../styles/colors';

export default function PoliticaPrivacidadeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={moderateScale(28)} color={COLORS.primary} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Política de Privacidade</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.text}>
          O ReciclAÊ respeita sua privacidade. Seus dados pessoais (nome, foto, endereço e histórico de coletas) são usados apenas para conectar você a sucateiros próximos e gamificar sua reciclagem.{'\n\n'}
          • Não vendemos seus dados{'\n'}
          • Seu endereço é compartilhado apenas com o coletor no momento da coleta{'\n'}
          • Você pode apagar seus dados a qualquer momento{'\n\n'}
          Ao usar o app, você concorda com essa política simples e transparente. ♻️
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: moderateScale(20) },
  title: { fontSize: moderateScale(22), fontWeight: 'bold', color: COLORS.primary },
  content: { paddingHorizontal: moderateScale(20) },
  text: { fontSize: moderateScale(16), lineHeight: 24, color: '#444', textAlign: 'justify' },
});