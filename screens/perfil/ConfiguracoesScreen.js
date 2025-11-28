// screens/perfil/ConfiguracoesScreen.js
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { hp, moderateScale } from '../../utils/scale';
import { COLORS } from '../../styles/colors';

export default function ConfiguracoesScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={moderateScale(28)} color={COLORS.primary} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Configurações</Text>
        <View style={{ width: 28 }} />
      </View>
      <View style={styles.content}>
        <Pressable style={styles.item}>
          <Text style={styles.itemText}>Notificações</Text>
          <Icon name="chevron-forward" size={24} color="#999" />
        </Pressable>
        <Pressable style={styles.item}>
          <Text style={styles.itemText}>Idioma</Text>
          <Text style={styles.value}>Português (BR)</Text>
        </Pressable>
        <Pressable style={styles.item}>
          <Text style={styles.itemText}>Tema</Text>
          <Text style={styles.value}>Claro</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: moderateScale(20) },
  title: { fontSize: moderateScale(22), fontWeight: 'bold', color: COLORS.primary },
  content: { paddingHorizontal: moderateScale(20) },
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: moderateScale(18), borderBottomWidth: 1, borderColor: '#eee' },
  itemText: { fontSize: moderateScale(17), color: '#333' },
  value: { fontSize: moderateScale(16), color: '#666' },
});