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
        // Caso não tenha user (primeira vez), cria um padrão
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
    // Pedir permissões (galeria + câmera)
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

      // Garante que user nunca seja null
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
    navigation.replace('Auth'); // replace pra não voltar com back
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER COM FOTO */}
      <View style={styles.header}>
        <Pressable style={styles.photoContainer} onPress={pickImage}>
          {user?.foto ? (
            <Image source={{ uri: user.foto }} style={styles.photo} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Icon name="person" size={60} color="#ccc" />
            </View>
          )}
          <View style={styles.cameraOverlay}>
            <Icon name="camera" size={26} color="#fff" />
          </View>
        </Pressable>

        <Text style={styles.name}>{user?.nickname || 'Usuário'}</Text>
        <Text style={styles.type}>
          {user?.role === 'producer' ? 'Produtor' : 'Sucateiro'}
        </Text>

        {/* STATS */}
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

      {/* MENU */}
      <View style={styles.menu}>
        <Pressable
          style={[styles.menuItem, activeMenu === 'historico' && styles.active]}
          onPress={() => setActiveMenu('historico')}
        >
          <Icon name="time" size={24} color={activeMenu === 'historico' ? COLORS.primary : '#666'} />
          <Text style={[styles.menuText, activeMenu === 'historico' && styles.activeText]}>
            Histórico
          </Text>
        </Pressable>
        <Pressable
          style={[styles.menuItem, activeMenu === 'editar' && styles.active]}
          onPress={() => setActiveMenu('editar')}
        >
          <Icon name="create" size={24} color={activeMenu === 'editar' ? COLORS.primary : '#666'} />
          <Text style={[styles.menuText, activeMenu === 'editar' && styles.activeText]}>
            Editar Perfil
          </Text>
        </Pressable>
      </View>

      {/* OPÇÕES EXTRAS */}
      <View style={styles.options}>
        <Pressable style={styles.optionItem}>
          <Icon name="shield-checkmark" size={24} color="#666" />
          <Text style={styles.optionText}>Política de Privacidade</Text>
          <Icon name="chevron-forward" size={20} color="#ccc" />
        </Pressable>
        <Pressable style={styles.optionItem}>
          <Icon name="settings" size={24} color="#666" />
          <Text style={styles.optionText}>Configurações do App</Text>
          <Icon name="chevron-forward" size={20} color="#ccc" />
        </Pressable>
        <Pressable style={styles.optionItem}>
          <Icon name="help-circle" size={24} color="#666" />
          <Text style={styles.optionText}>Ajuda e Suporte</Text>
          <Icon name="chevron-forward" size={20} color="#ccc" />
        </Pressable>
        <Pressable style={styles.optionItem}>
          <Icon name="share-social" size={24} color="#666" />
          <Text style={styles.optionText}>Convidar Amigos</Text>
          <Icon name="chevron-forward" size={20} color="#ccc" />
        </Pressable>
      </View>

      {/* SAIR */}
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
    paddingVertical: 50,
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
    marginBottom: 16,
  },
  photo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 6,
    borderColor: '#fff',
    backgroundColor: '#eee',
  },
  photoPlaceholder: {
    width: 130,
    height: 130,
    borderRadius: 65,
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
  name: { fontSize: 28, fontWeight: '900', color: COLORS.primary, marginTop: 8 },
  type: { fontSize: 16, color: '#666', marginTop: 4 },
  stats: { flexDirection: 'row', gap: 50, marginTop: 20 },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, marginTop: 5 },
  menu: { paddingHorizontal: 20, marginTop: 20 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 8,
    elevation: 3,
  },
  active: { backgroundColor: '#f0f8f0', borderWidth: 2, borderColor: COLORS.primary },
  menuText: { marginLeft: 16, fontSize: 16, fontWeight: '500' },
  activeText: { color: COLORS.primary, fontWeight: 'bold' },
  options: { paddingHorizontal: 20, marginTop: 10 },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 8,
    elevation: 2,
  },
  optionText: { flex: 1, marginLeft: 16, fontSize: 16, color: '#333' },
  logout: {
    margin: 20,
    backgroundColor: '#dc3545',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 5,
  },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});