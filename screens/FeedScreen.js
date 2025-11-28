// screens/FeedScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await AsyncStorage.getItem('posts');
      if (data) {
        setPosts(JSON.parse(data));
      }
    } catch (error) {
      console.log('Erro ao carregar posts', error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Preciso de acesso à galeria para selecionar imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets) {
      setNewPostImage(result.assets[0].uri);
    }
  };

  const postar = async () => {
    if (!newPostText.trim()) {
      Alert.alert('Erro', 'Escreva algo sobre o seu momento de reciclagem!');
      return;
    }

    const novoPost = {
      id: Date.now().toString(),
      text: newPostText,
      image: newPostImage,
      user: 'Usuário Atual', // Pode integrar com user.nickname
      date: new Date().toLocaleString(),
    };

    const updatedPosts = [novoPost, ...posts];
    await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setNewPostText('');
    setNewPostImage(null);
    Alert.alert('Sucesso', 'Post compartilhado na comunidade!');
  };

  const renderPost = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.user}>{item.user} • {item.date}</Text>
      <Text style={styles.text}>{item.text}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed da Comunidade</Text>
      <Text style={styles.subtitle}>Compartilhe seus momentos de reciclagem!</Text>

      {/* Área para novo post */}
      <View style={styles.newPost}>
        <TextInput
          style={styles.input}
          placeholder="O que você reciclou hoje?"
          value={newPostText}
          onChangeText={setNewPostText}
          multiline
        />
        <View style={styles.actions}>
          <TouchableOpacity onPress={pickImage} style={styles.iconBtn}>
            <Icon name="image" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={postar} style={styles.postBtn}>
            <Text style={styles.postBtnText}>Postar</Text>
          </TouchableOpacity>
        </View>
        {newPostImage && <Image source={{ uri: newPostImage }} style={styles.preview} />}
      </View>

      {/* Lista de posts */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Seja o primeiro a compartilhar!</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  newPost: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 20, elevation: 2 },
  input: { minHeight: 60, fontSize: 16, color: '#333' },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  iconBtn: { padding: 8 },
  postBtn: { backgroundColor: COLORS.primary, padding: 10, borderRadius: 8 },
  postBtnText: { color: '#fff', fontWeight: 'bold' },
  preview: { width: '100%', height: 200, borderRadius: 8, marginTop: 10 },
  post: { backgroundColor: '#fff', padding: 15, borderRadius: 12, marginBottom: 15, elevation: 2 },
  user: { fontSize: 14, color: '#666', marginBottom: 5 },
  text: { fontSize: 16, color: '#333', marginBottom: 10 },
  image: { width: '100%', height: 200, borderRadius: 8 },
  empty: { textAlign: 'center', color: '#666', marginTop: 50 },
});