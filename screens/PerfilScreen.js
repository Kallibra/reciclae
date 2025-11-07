// screens/PerfilScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, Alert } from 'react-native';
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
    const data = await AsyncStorage.getItem('user');
    if (data) setUser(JSON.parse(data));
  };

    const pickImage = async () => {
    // PERMISSÃO
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Ops!', 'Preciso da permissão pra acessar suas fotos!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const updatedUser = { ...user, foto: uri };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Auth');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER COM FOTO */}
      <View style={styles.header}>
        <Pressable style={styles.photoContainer} onPress={pickImage}>
          <Image 
            source={{ uri: user?.foto || 'https://via.placeholder.com/120' }} 
            style={styles.photo}
          />
          <View style={styles.cameraOverlay}>
            <Icon name="camera" size={28} color="#fff" />
          </View>
        </Pressable>

        <Text style={styles.name}>{user?.nickname || 'Valdeliane'}</Text>
        <Text style={styles.type}>{user?.role === 'producer' ? 'Produtor' : 'Sucateiro'}</Text>

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
        <Pressable style={[styles.menuItem, activeMenu === 'historico' && styles.active]} onPress={() => setActiveMenu('historico')}>
          <Icon name="time" size={24} color={activeMenu === 'historico' ? COLORS.primary : '#666'} />
          <Text style={[styles.menuText, activeMenu === 'historico' && styles.activeText]}>Histórico</Text>
        </Pressable>
        <Pressable style={[styles.menuItem, activeMenu === 'editar' && styles.active]} onPress={() => setActiveMenu('editar')}>
          <Icon name="create" size={24} color={activeMenu === 'editar' ? COLORS.primary : '#666'} />
          <Text style={[styles.menuText, activeMenu === 'editar' && styles.activeText]}>Editar Perfil</Text>
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
  header: { alignItems: 'center', paddingVertical: 50, backgroundColor: '#fff', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 5 },
  photoContainer: { position: 'relative' },
  photo: { 
    width: 130, 
    height: 130, 
    borderRadius: 65, 
    borderWidth: 6,           // ← CÍRCULO BRANCO GROSSO
    borderColor: '#fff', 
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  cameraOverlay: { 
    position: 'absolute', 
    bottom: 5, 
    right: 5, 
    backgroundColor: COLORS.primary, 
    borderRadius: 30, 
    padding: 12,
    borderWidth: 4,           // ← BORDA BRANCA NA CÂMERA
    borderColor: '#fff',
    elevation: 5,
  },
  name: { fontSize: 28, fontWeight: '900', color: COLORS.primary, marginTop: 16, fontFamily: 'Roboto-Black' },
  type: { fontSize: 16, color: '#666', fontFamily: 'Roboto-Medium' },
  stats: { flexDirection: 'row', gap: 50, marginTop: 20 },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, marginTop: 5, fontFamily: 'Roboto-Bold' },
  menu: { paddingHorizontal: 20, marginTop: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#fff', borderRadius: 14, marginBottom: 8, elevation: 3 },
  active: { backgroundColor: '#f0f8f0', borderWidth: 2, borderColor: COLORS.primary },
  menuText: { marginLeft: 16, fontSize: 16, fontFamily: 'Roboto-Medium' },
  activeText: { color: COLORS.primary, fontWeight: 'bold' },
  options: { paddingHorizontal: 20, marginTop: 10 },
  optionItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderRadius: 14, marginBottom: 8, elevation: 2 },
  optionText: { flex: 1, marginLeft: 16, fontSize: 16, fontFamily: 'Roboto-Medium', color: '#333' },
  logout: { margin: 20, backgroundColor: '#dc3545', padding: 18, borderRadius: 14, alignItems: 'center', elevation: 5 },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16, fontFamily: 'Roboto-Bold' },
});