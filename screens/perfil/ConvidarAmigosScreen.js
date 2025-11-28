// screens/perfil/ConvidarAmigosScreen.js
import React from 'react';
import { View, Text, Pressable, Share, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { hp, moderateScale } from '../../utils/scale';
import { COLORS } from '../../styles/colors';

export default function ConvidarAmigosScreen({ navigation }) {
  const onShare = async () => {
    try {
      await Share.share({
        message: 'Baixe o ReciclAÊ e ganhe pontos reciclando! ♻️ https://reciclae.app',
      });
    } catch (error) { }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" size={moderateScale(28)} color={COLORS.primary} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Convidar Amigos</Text>
        <View style={{ width: 28 }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.desc}>Convide amigos e ganhe 50kg de bônus por cada um que se cadastrar!</Text>
        <Pressable style={styles.shareButton} onPress={onShare}>
          <Icon name="share-social" size={28} color="#fff" />
          <Text style={styles.shareText}>Compartilhar ReciclAÊ</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: moderateScale(20) },
  title: { fontSize: moderateScale(22), fontWeight: 'bold', color: COLORS.primary },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: moderateScale(30) },
  desc: { fontSize: moderateScale(18), textAlign: 'center', color: '#444', marginBottom: hp(5) },
  shareButton: { flexDirection: 'row', backgroundColor: COLORS.primary, padding: moderateScale(20), borderRadius: 16, alignItems: 'center' },
  shareText: { color: '#fff', fontSize: moderateScale(18), fontWeight: 'bold', marginLeft: 12 },
});