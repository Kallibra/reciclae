// screens/FeedScreen.js → VERSÃO FINAL 100% FUNCIONAL E SEM ERRO NENHUM!
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Alert,
  Modal,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../styles/colors';
import { moderateScale } from '../utils/scale';

// ← AQUI TÁ A MÁGICA: recebendo navigation como prop!
export default function FeedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({ nickname: 'Você', foto: null });
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    loadUserAndPosts();
  }, []);

  const loadUserAndPosts = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const postsData = await AsyncStorage.getItem('posts');

      if (userData) {
        const parsed = JSON.parse(userData);
        setUser({
          nickname: parsed.nickname || 'Reciclador',
          foto: parsed.foto || null,
        });
      }

      if (postsData) {
        const loaded = JSON.parse(postsData);
        setPosts(loaded.sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (e) {
      console.log('Erro:', e);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Permissão necessária!');

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setNewPostImage(result.assets[0].uri);
    }
  };

  const postar = async () => {
    if (!newPostText.trim() && !newPostImage) return Alert.alert('Escreva algo ou adicione uma foto!');

    const novoPost = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      text: newPostText.trim(),
      image: newPostImage,
      user: user.nickname,
      userFoto: user.foto,
      likes: 0,
      likedByMe: false,
      comments: [],
    };

    const updated = [novoPost, ...posts];
    await AsyncStorage.setItem('posts', JSON.stringify(updated));
    setPosts(updated);
    setNewPostText('');
    setNewPostImage(null);
    Alert.alert('Publicado!', 'Sua reciclagem inspirou a galera! ♻️');
  };

  const curtirPost = async (postId) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: p.likedByMe ? p.likes - 1 : p.likes + 1,
          likedByMe: !p.likedByMe,
        };
      }
      return p;
    });
    setPosts(updated);
    await AsyncStorage.setItem('posts', JSON.stringify(updated));
  };

  const abrirComentarios = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const adicionarComentario = async () => {
    if (!commentText.trim()) return;

    const novoComentario = {
      id: Date.now().toString(),
      text: commentText,
      user: user.nickname,
      timestamp: Date.now(),
    };

    const updatedPosts = posts.map(p => {
      if (p.id === selectedPost.id) {
        return { ...p, comments: [...p.comments, novoComentario] };
      }
      return p;
    });

    setPosts(updatedPosts);
    await AsyncStorage.setItem('posts', JSON.stringify(updatedPosts));
    setCommentText('');
    setSelectedPost({ ...selectedPost, comments: [...selectedPost.comments, novoComentario] });
  };

  const compartilharPost = async (post) => {
    try {
      await Share.share({
        message: `${post.user} compartilhou no ReciclAê:\n"${post.text || 'Foto incrível!'}"\n\nBaixe o app e junte-se! ♻️`,
        url: post.image,
      });
    } catch (error) {
      Alert.alert('Erro ao compartilhar');
    }
  };

  const formatDate = (ts) => {
    const diff = (Date.now() - ts) / (1000 * 60 * 60);
    if (diff < 1) return 'agora';
    if (diff < 24) return `há ${Math.floor(diff)}h`;
    if (diff < 168) return `há ${Math.floor(diff / 24)}d`;
    return new Date(ts).toLocaleDateString('pt-BR');
  };

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image
          source={item.userFoto ? { uri: item.userFoto } : require('../assets/avatar-placeholder.png')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.postUser}>{item.user}</Text>
          <Text style={styles.postTime}>{formatDate(item.timestamp)}</Text>
        </View>
      </View>

      {item.text ? <Text style={styles.postText}>{item.text}</Text> : null}
      {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}

      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => curtirPost(item.id)}>
          <Icon name={item.likedByMe ? 'heart' : 'heart-outline'} size={26} color={item.likedByMe ? '#e74c3c' : '#666'} />
          <Text style={[styles.actionText, item.likedByMe && { color: '#e74c3c' }]}>
            {item.likes || 'Curtir'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={() => abrirComentarios(item)}>
          <Icon name="chatbubble-outline" size={24} color="#666" />
          <Text style={styles.actionText}>{item.comments?.length || 'Comentar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtn} onPress={() => compartilharPost(item)}>
          <Icon name="share-social-outline" size={24} color="#666" />
          <Text style={styles.actionText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Feed da Comunidade</Text>

      {/* Novo Post */}
      <View style={styles.newPostContainer}>
        <View style={styles.inputRow}>
          <Image source={user.foto ? { uri: user.foto } : require('../assets/avatar-placeholder.png')} style={styles.myAvatar} />
          <TextInput
            style={styles.input}
            placeholder={`O que você reciclou hoje, ${user.nickname}? ♻️`}
            value={newPostText}
            onChangeText={setNewPostText}
            multiline
          />
        </View>

        {newPostImage && <Image source={{ uri: newPostImage }} style={styles.previewImage} />}

        <View style={styles.postActionsBar}>
          <TouchableOpacity onPress={pickImage} style={styles.mediaBtn}>
            <Icon name="image-outline" size={26} color={COLORS.primary} />
            <Text style={styles.mediaText}>Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={postar} style={styles.postButton}>
            <Text style={styles.postButtonText}>Postar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.empty}>Seja o primeiro a postar! ♻️</Text>}
      />

      {/* Modal de Comentários */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Comentários</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={28} color="#666" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={selectedPost?.comments || []}
              renderItem={({ item }) => (
                <View style={styles.comment}>
                  <Text style={styles.commentUser}>{item.user}</Text>
                  <Text style={styles.commentText}>{item.text}</Text>
                </View>
              )}
              keyExtractor={item => item.id}
              style={{ maxHeight: 300 }}
            />

            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Escreva um comentário..."
                value={commentText}
                onChangeText={setCommentText}
              />
              <TouchableOpacity onPress={adicionarComentario}>
                <Icon name="send" size={24} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ESTILOS LINDOS
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  title: { fontSize: 26, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginVertical: 20 },
  
  newPostContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 20,
    borderRadius: 16,
    padding: 15,
    elevation: 4,
  },
  inputRow: { flexDirection: 'row', alignItems: 'flex-start' },
  myAvatar: { width: 45, height: 45, borderRadius: 22.5, marginRight: 12 },
  input: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 50,
    maxHeight: 120,
  },
  previewImage: { width: '100%', height: 220, borderRadius: 12, marginTop: 12 },
  postActionsBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  mediaBtn: { flexDirection: 'row', alignItems: 'center' },
  mediaText: { marginLeft: 8, color: COLORS.primary, fontWeight: '600' },
  postButton: { backgroundColor: COLORS.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 25 },
  postButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  postCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  postUser: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  postTime: { fontSize: 13, color: '#888' },
  postText: { paddingHorizontal: 15, paddingBottom: 10, fontSize: 16, color: '#333', lineHeight: 22 },
  postImage: { width: '100%', height: 300 },
  postActions: { flexDirection: 'row', padding: 12, borderTopWidth: 1, borderTopColor: '#eee' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 30 },
  actionText: { marginLeft: 8, color: '#666', fontSize: 15 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  comment: { paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' },
  commentUser: { fontWeight: 'bold', color: COLORS.primary },
  commentText: { marginTop: 4 },
  commentInputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  commentInput: { flex: 1, backgroundColor: '#f0f0f0', borderRadius: 20, padding: 12, marginRight: 10 },
  empty: { textAlign: 'center', color: '#666', marginTop: 50 },
});