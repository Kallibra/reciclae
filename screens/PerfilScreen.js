// screens/PerfilScreen.js
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

// IMPORTS DAS NOVAS TELAS (já organizadas na pasta perfil)
import HistoricoScreen from './perfil/HistoricoScreen';
import EditarPerfilScreen from './perfil/EditarPerfilScreen';
import PoliticaPrivacidadeScreen from './perfil/PoliticaPrivacidadeScreen';
import ConfiguracoesScreen from './perfil/ConfiguracoesScreen';
import AjudaSuporteScreen from './SobreScreen.js.js';
import ConvidarAmigosScreen from './perfil/ConvidarAmigosScreen';

export default function PerfilScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState('historico');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await AsyncStorage.getItem('user');
      if (data) {
        setUser(JSON.parse(data));
      } else {
        const defaultUser = {
          nickname: 'Valdeliane',
          role: 'producer',
          foto: null,
        };
        setUser(defaultUser);
      }
    } catch (e) {
      console.log('Erro ao carregar user:', e);
    }
  };

  const pickImage = async () => {
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

    if (mediaStatus !== 'granted' && cameraStatus !== 'granted') {
      Alert.alert('Ops!', 'Preciso da permissão pra acessar suas fotos e câmera!');
      return;
    }

    Alert.alert(
      'Escolher foto',
      'De onde você quer pegar a foto?',
      [
        { text: 'Galeria', onPress: () => openPicker('library') },
        { text: 'Câmera', onPress: () => openPicker('camera') },
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  const openPicker = async (source) => {
    let result;
    if (source === 'library') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
    } else {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
    }

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const currentUser = user || {};
      const updatedUser = { ...currentUser, foto: uri };

      try {
        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        Alert.alert('Sucesso!', 'Foto atualizada com sucesso! 🎉');
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível salvar a foto.');
      }
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.replace('Auth');
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: hp(15) }}
    >
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
            <Icon name="camera" size={moderateScale(26)} color="#fff" />
          </View>
        </Pressable>

        <Text style={styles.name}>{user?.nickname || 'Usuário'}</Text>
        <Text style={styles.type}>
          {user?.role === 'producer' ? 'Produtor' : 'Sucateiro'}
        </Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Icon name="star" size={moderateScale(22)} color="#ffd700" />
            <Text style={styles.statValue}>4.8</Text>
          </View>
          <View style={styles.stat}>
            <Icon name="leaf" size={moderateScale(22)} color={COLORS.primary} />
            <Text style={styles.statValue}>150kg</Text>
          </View>
          <View style={styles.stat}>
            <Icon name="trophy" size={moderateScale(22)} color="#28a745" />
            <Text style={styles.statValue}>Top 10</Text>
          </View>
        </View>
      </View>

      <View style={styles.menu}>
        <Pressable
          style={[styles.menuItem, activeMenu === 'historico' && styles.active]}
          onPress={() => {
            setActiveMenu('historico');
            navigation.navigate('Historico');
          }}
        >
          <Icon name="time" size={moderateScale(24)} color={activeMenu === 'historico' ? COLORS.primary : '#666'} />
          <Text style={[styles.menuText, activeMenu === 'historico' && styles.activeText]}>
            Histórico
          </Text>
        </Pressable>

        <Pressable
          style={[styles.menuItem, activeMenu === 'editar' && styles.active]}
          onPress={() => {
            setActiveMenu('editar');
            navigation.navigate('EditarPerfil');
          }}
        >
          <Icon name="create" size={moderateScale(24)} color={activeMenu === 'editar' ? COLORS.primary : '#666'} />
          <Text style={[styles.menuText, activeMenu === 'editar' && styles.activeText]}>
            Editar Perfil
          </Text>
        </Pressable>
      </View>

      <View style={styles.options}>
        <Pressable style={styles.optionItem} onPress={() => navigation.navigate('PoliticaPrivacidade')}>
          <Icon name="shield-checkmark" size={moderateScale(24)} color="#666" />
          <Text style={styles.optionText}>Política de Privacidade</Text>
          <Icon name="chevron-forward" size={moderateScale(20)} color="#ccc" />
        </Pressable>

        <Pressable style={styles.optionItem} onPress={() => navigation.navigate('Configuracoes')}>
          <Icon name="settings" size={moderateScale(24)} color="#666" />
          <Text style={styles.optionText}>Configurações do App</Text>
          <Icon name="chevron-forward" size={moderateScale(20)} color="#ccc" />
        </Pressable>

        <Pressable style={styles.optionItem} onPress={() => navigation.navigate('AjudaSuporte')}>
          <Icon name="help-circle" size={moderateScale(24)} color="#666" />
          <Text style={styles.optionText}>Ajuda e Suporte</Text>
          <Icon name="chevron-forward" size={moderateScale(20)} color="#ccc" />
        </Pressable>

        <Pressable style={styles.optionItem} onPress={() => navigation.navigate('ConvidarAmigos')}>
          <Icon name="share-social" size={moderateScale(24)} color="#666" />
          <Text style={styles.optionText}>Convidar Amigos</Text>
          <Icon name="chevron-forward" size={moderateScale(20)} color="#ccc" />
        </Pressable>
      </View>

      <Pressable style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair da Conta</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: hp(2),
  },
  photo: {
    width: wp(34),
    height: wp(34),
    borderRadius: wp(17),
    borderWidth: 6,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
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
    elevation: Platform.OS === 'android' ? 10 : 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  name: { fontSize: moderateScale(28), fontWeight: '900', color: COLORS.primary, marginTop: hp(1) },
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
  active: { backgroundColor: '#f0f8f0', borderWidth: 2, borderColor: COLORS.primary },
  menuText: { marginLeft: wp(4), fontSize: moderateScale(16), fontWeight: '500' },
  activeText: { color: COLORS.primary, fontWeight: 'bold' },
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
    margin: wp(5),
    backgroundColor: '#dc3545',
    paddingVertical: moderateScale(18),
    borderRadius: 14,
    alignItems: 'center',
    elevation: 5,
  },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: moderateScale(16) },
});