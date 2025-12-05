// screens/PerfilScreen.js → VERSÃO FINAL 100% CORRETA E FUNCIONAL
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { wp, hp, moderateScale } from '../utils/scale';

export default function PerfilScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await AsyncStorage.getItem('user');
      if (data) {
        setUser(JSON.parse(data));
      }
    } catch (e) {
      console.log('Erro ao carregar usuário:', e);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Preciso acessar suas fotos!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      const novaFoto = result.assets[0].uri;
      const updatedUser = { ...user, foto: novaFoto };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  // SAIR DA CONTA → NÃO APAGA O USUÁRIO (só sai da sessão)
  const sairDaConta = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que quer sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            // ← NÃO REMOVE O USUÁRIO! Só volta pro login
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
        },
      ]
    );
  };

  // APAGAR CONTA → remove o usuário e volta pro cadastro do zero
  const apagarConta = async () => {
    Alert.alert(
      'Apagar conta permanentemente',
      'Essa ação não pode ser desfeita!\n\nTodos os seus dados serão excluídos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar conta',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('user');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: hp(15) }}>
      {/* Foto e dados */}
      <View style={styles.header}>
        <Pressable style={styles.photoContainer} onPress={pickImage}>
          {user?.foto ? (
            <Image source={{ uri: user.foto }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Icon name="person" size={moderateScale(60)} color="#ccc" />
            </View>
          )}
          <View style={styles.cameraOverlay}>
            <Icon name="camera" size={26} color="#fff" />
          </View>
        </Pressable>

        <Text style={styles.name}>{user?.nickname || 'Usuário'}</Text>
        <Text style={styles.type}>
          {user?.role === 'producer' ? 'Produtor de Materiais' : 'Sucateiro'}
        </Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Icon name="star" size={22} color="#ffd700" />
            <Text style={styles.statValue}>4.8</Text>
          </View>
          <View style={styles.stat}>
            <Icon name="leaf" size={22} color={COLORS.primary} />
            <Text style={styles.statValue}>150kg</Text>
          </View>
          <View style={styles.stat}>
            <Icon name="trophy" size={22} color="#28a745" />
            <Text style={styles.statValue}>Top 10</Text>
          </View>
        </View>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <Pressable style={styles.menuItem} onPress={() => navigation.navigate('EditarPerfil')}>
          <Icon name="create" size={24} color={COLORS.primary} />
          <Text style={styles.menuText}>Editar Perfil</Text>
        </Pressable>

        <Pressable style={styles.menuItem} onPress={() => navigation.navigate('ConvidarAmigos')}>
          <Icon name="share-social" size={24} color={COLORS.primary} />
          <Text style={styles.menuText}>Convidar Amigos</Text>
        </Pressable>
      </View>

      {/* Opções */}
      <View style={styles.options}>
        <Pressable style={styles.optionItem} onPress={() => navigation.navigate('PoliticaPrivacidadeScreen')}>
          <Icon name="shield-checkmark" size={24} color="#666" />
          <Text style={styles.optionText}>Política de Privacidade</Text>
          <Icon name="chevron-forward" size={20} color="#ccc" />
        </Pressable>

        <Pressable style={styles.optionItem} onPress={() => navigation.navigate('Sobre')}>
          <Icon name="information-circle" size={24} color="#666" />
          <Text style={styles.optionText}>Sobre o ReciclAÊ</Text>
          <Icon name="chevron-forward" size={20} color="#ccc" />
        </Pressable>
      </View>

      {/* Botões finais */}
      <Pressable style={styles.logout} onPress={sairDaConta}>
        <Icon name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </Pressable>

      <Pressable style={styles.deleteAccount} onPress={apagarConta}>
        <Icon name="trash-outline" size={20} color="#dc3545" />
        <Text style={styles.deleteText}>Apagar Conta Permanentemente</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    alignItems: 'center',
    paddingVertical: hp(6),
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
  },
  photoContainer: { position: 'relative', marginBottom: hp(2) },
  photo: { width: wp(34), height: wp(34), borderRadius: wp(17), borderWidth: 6, borderColor: '#fff' },
  photoPlaceholder: {
    width: wp(34),
    height: wp(34),
    borderRadius: wp(17),
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#fff',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    padding: 12,
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: { fontSize: moderateScale(28), fontWeight: '900', color: COLORS.primary },
  type: { fontSize: moderateScale(16), color: '#666', marginTop: hp(0.5) },
  stats: { flexDirection: 'row', gap: wp(12), marginTop: hp(2.5) },
  stat: { alignItems: 'center' },
  statValue: { fontSize: moderateScale(16), fontWeight: 'bold', color: COLORS.primary, marginTop: hp(0.5) },

  menu: { paddingHorizontal: wp(5), marginTop: hp(3) },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(16),
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: hp(1),
    elevation: 3,
  },
  menuText: { marginLeft: wp(4), fontSize: moderateScale(16), fontWeight: '500', color: '#333' },

  options: { paddingHorizontal: wp(5), marginTop: hp(2) },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(16),
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: hp(1),
    elevation: 2,
  },
  optionText: { flex: 1, marginLeft: wp(4), fontSize: moderateScale(16), color: '#333' },

  logout: {
    marginHorizontal: wp(5),
    marginTop: hp(3),
    backgroundColor: COLORS.primary,
    paddingVertical: moderateScale(18),
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: moderateScale(16), marginLeft: 10 },

  deleteAccount: {
    marginHorizontal: wp(5),
    marginTop: hp(2),
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#dc3545',
    paddingVertical: moderateScale(18),
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: { color: '#dc3545', fontWeight: 'bold', fontSize: moderateScale(16), marginLeft: 10 },
});