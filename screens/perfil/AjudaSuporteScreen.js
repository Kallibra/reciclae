// screens/perfil/AjudaSuporteScreen.js
import React from 'react';
import { ScrollView, Text, Pressable, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { hp, moderateScale } from '../../utils/scale';
import { COLORS } from '../../styles/colors';

export default function AjudaSuporteScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={moderateScale(28)} color={COLORS.primary} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Ajuda e Suporte</Text>
        <View style={{ width: 28 }} />
      </View>
      <ScrollView style={styles.content}>
        <Pressable style={styles.item} onPress={() => Linking.openURL('mailto:suporte@reciclae.com')}>
          <Icon name="mail" size={24} color={COLORS.primary} />
          <Text style={styles.itemText}>Enviar e-mail para suporte</Text>
        </Pressable>
        <Pressable style={styles.item} onPress={() => Linking.openURL('https://wa.me/5591999999999')}>
          <Icon name="logo-whatsapp" size={24} color="#25D366" />
          <Text style={styles.itemText}>Falar no WhatsApp</Text>
        </Pressable>
        <Text style={styles.faq}>Perguntas Frequentes (em breve)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: moderateScale(20) },
  title: { fontSize: moderateScale(22), fontWeight: 'bold', color: COLORS.primary },
  content: { paddingHorizontal: moderateScale(20) },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: moderateScale(18), borderBottomWidth: 1, borderColor: '#eee' },
  itemText: { marginLeft: 16, fontSize: moderateScale(17), color: '#333' },
  faq: { marginTop: hp(4), fontSize: moderateScale(16), color: '#666', fontStyle: 'italic' },
});