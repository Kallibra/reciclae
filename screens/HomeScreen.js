// screens/HomeScreen.js
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Polygon } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { View, SafeAreaView, StyleSheet, Animated, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native';

const { height: screenHeight } = Dimensions.get('window'); // Novo: Para calcular tamanhos dinâmicos baseados na tela

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [reciclagem, setReciclagem] = useState(0);
  const [bairroStatus, setBairroStatus] = useState(0);
  const [anuncios, setAnuncios] = useState([]); // Para coletores
  const [activeTab, setActiveTab] = useState('ranking');
  const [loading, setLoading] = useState(true);

  const drawerFullHeight = screenHeight * 0.5; // 50% da altura da tela para o drawer
  const headerHeight = screenHeight * 0.08; // 8% para o header
  const translateY = useRef(new Animated.Value(drawerFullHeight * 0.5)).current; // Inicial proporcional

  useEffect(() => {
    loadUserAndProgress().finally(() => setLoading(false));
    const unsubscribe = navigation.addListener('focus', () => {
      // Verifica se veio de RecicleTab de forma mais robusta
      const currentRoute = navigation.getState()?.routes?.[navigation.getState().index]?.name;
      if (currentRoute === 'RecicleTab') {
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
      }
    });
    return unsubscribe;
  }, [navigation]);

  const loadUserAndProgress = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const u = JSON.parse(userData);
        setUser(u);
        const kg = u.role === 'producer' ? 15 : 8;
        const status = u.role === 'producer' ? 60 : 30;
        setReciclagem(kg);
        setBairroStatus(status);

        if (u.role === 'coletor') {
          const anunciosData = await AsyncStorage.getItem('anuncios');
          if (anunciosData) {
            setAnuncios(JSON.parse(anunciosData).filter(a => a.status === 'disponivel'));
          }
        }
      }
    } catch (error) {
      console.log('Erro ao carregar dados', error);
    }
  };

  const bairroAnanindeua = [
    { latitude: -1.365, longitude: -48.372 },
    { latitude: -1.360, longitude: -48.370 },
    { latitude: -1.358, longitude: -48.375 },
    { latitude: -1.362, longitude: -48.380 },
    { latitude: -1.367, longitude: -48.378 },
  ];

  const corBairro = bairroStatus >= 100
    ? 'rgba(26, 93, 26, 0.8)'
    : bairroStatus >= 50
    ? 'rgba(46, 125, 50, 0.6)'
    : bairroStatus >= 25
    ? 'rgba(76, 175, 80, 0.5)'
    : 'rgba(150, 150, 150, 0.6)';

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === 5) {
      const { translationY } = nativeEvent;
      const dragUp = translationY < -80;
      const dragDown = translationY > 80;

      if (dragUp) {
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
      } else if (dragDown) {
        Animated.spring(translateY, { toValue: drawerFullHeight - headerHeight, useNativeDriver: true }).start();
      } else {
        const current = translateY._value;
        Animated.spring(translateY, {
          toValue: current < drawerFullHeight / 2 ? 0 : drawerFullHeight - headerHeight,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const renderTabContent = () => {
    const isProducer = user?.role === 'producer';
    switch (activeTab) {
      case 'ranking':
        return (
          <View style={styles.panel}>
            <Text style={styles.item}>1º {isProducer ? 'Kalebe - 150kg produzidos' : 'João - 120kg coletados'}</Text>
            <Text style={styles.item}>2º {isProducer ? 'João - 120kg' : 'Maria - 100kg'}</Text>
            <Text style={styles.item}>3º {isProducer ? 'Maria - 100kg' : 'Pedro - 90kg'}</Text>
          </View>
        );
      case 'historico':
        return (
          <View style={styles.panel}>
            <Text style={styles.item}>10/04 - {isProducer ? '5kg Plástico vendidos' : '3kg Papel coletados'}</Text>
            <Text style={styles.item}>08/04 - {isProducer ? '3kg Papel' : '5kg Metal'}</Text>
          </View>
        );
      case 'dicas':
        return (
          <View style={styles.panel}>
            <Text style={styles.item}>Separe o lixo úmido do seco</Text>
            <Text style={styles.item}>Lave embalagens antes de descartar</Text>
            <Text style={styles.item}>{isProducer ? 'Anuncie materiais limpos para melhor preço' : 'Busque anúncios próximos para otimizar rotas'}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <Text>Carregando...</Text>
        </View>
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -1.365,
              longitude: -48.372,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            {user?.role === 'producer' && (
              <Polygon
                coordinates={bairroAnanindeua}
                fillColor={corBairro}
                strokeColor={COLORS.primary}
              />
            )}

            {user?.role === 'coletor' && anuncios.map((anuncio, index) => (
              <Marker
                key={index}
                coordinate={{ latitude: -1.365 + (index * 0.001), longitude: -48.372 + (index * 0.001) }}
                title={`Anúncio: ${anuncio.endereco}`}
                description={Object.entries(anuncio.materiais).map(([tipo, qtd]) => qtd > 0 ? `${qtd}kg ${tipo}` : '').join(', ')}
                onPress={() => navigation.navigate('Chat', { anuncio })}
              />
            ))}
          </MapView>

          <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
            <Animated.View style={[styles.drawer, { height: drawerFullHeight, transform: [{ translateY }] }]}>
              <View style={[styles.header, { height: headerHeight }]}>
                <View style={styles.handle} />
                <View style={styles.tabBar}>
                  <TouchableOpacity
                    style={[styles.tab, activeTab === 'ranking' && styles.activeTab]}
                    onPress={() => setActiveTab('ranking')}
                  >
                    <Text style={[styles.tabText, activeTab === 'ranking' && styles.activeTabText]}>RANKING</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tab, activeTab === 'historico' && styles.activeTab]}
                    onPress={() => setActiveTab('historico')}
                  >
                    <Text style={[styles.tabText, activeTab === 'historico' && styles.activeTabText]}>HISTÓRICO</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.tab, activeTab === 'dicas' && styles.activeTab]}
                    onPress={() => setActiveTab('dicas')}
                  >
                    <Text style={[styles.tabText, activeTab === 'dicas' && styles.activeTabText]}>DICAS</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView style={styles.content}>
                {renderTabContent()}
              </ScrollView>
            </Animated.View>
          </PanGestureHandler>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' }, // Novo: Para loading responsivo
  map: { flex: 1 },

  // GAVETA (drawer)
  drawer: {
    position: 'absolute',
    bottom: 80, // Espaço pro TabBar
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    alignSelf: 'center',
    width: '20%', // % para escalar
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 3,
    marginTop: '2%', // % da tela
  },
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: '2%',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: '4%', // % para padding responsivo
  },
  panel: { flex: 1 },
  item: {
    fontSize: 15,
    color: '#333',
    marginBottom: '3%', // % para espaçamento
  },
});