// screens/HomeScreen.js
import React, { useState, useEffect, useRef } from 'react';
import MapView, { Marker, Polygon } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { View, SafeAreaView, StyleSheet, Animated, ScrollView, TouchableOpacity, Text } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [reciclagem, setReciclagem] = useState(0);
  const [bairroStatus, setBairroStatus] = useState(0);
  const [activeTab, setActiveTab] = useState('ranking');
  const [loading, setLoading] = useState(true);

  const translateY = useRef(new Animated.Value(180)).current;
  const drawerFullHeight = 380;
  const headerHeight = 60;

  useEffect(() => {
    loadUserAndProgress().finally(() => setLoading(false));
    const unsubscribe = navigation.addListener('focus', () => {
    // Se veio do RecicleTab, abre a gaveta
    if (navigation.getState().routes[0].name === 'RecicleTab') {
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

  return (
    <SafeAreaView style={styles.container}>
      {/* MAPA */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -1.365,
          longitude: -48.372,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        <Polygon
          coordinates={bairroAnanindeua}
          fillColor={corBairro}
          strokeColor="#000"
          strokeWidth={2}
        />
        <Marker
          coordinate={{ latitude: -1.365, longitude: -48.372 }}
          title="Você está aqui"
          pinColor={COLORS.primary}
        />
      </MapView>

      {/* GAVETA */}
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View style={[styles.drawer, { transform: [{ translateY }] }]}>
          <View style={styles.header}>
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
            {activeTab === 'ranking' && (
              <View style={styles.panel}>
                <Text style={styles.item}>1º Kalebe - 150kg</Text>
                <Text style={styles.item}>2º João - 120kg</Text>
                <Text style={styles.item}>3º Maria - 100kg</Text>
              </View>
            )}
            
            {activeTab === 'historico' && (
              <View style={styles.panel}>
                <Text style={styles.item}>10/04 - 5kg Plástico</Text>
                <Text style={styles.item}>08/04 - 3kg Papel</Text>
              </View>
            )}
            {activeTab === 'dicas' && (
              <View style={styles.panel}>
                <Text style={styles.item}>Separe o lixo úmido do seco</Text>
                <Text style={styles.item}>Lave embalagens antes de descartar</Text>
              </View>
            )}
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  map: { flex: 1 },

  // GAVETA
  drawer: {
    position: 'absolute',
    bottom: 80, // espaço pro TabBar
    left: 0,
    right: 0,
    height: 380,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 3,
    marginTop: 8,
  },
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginTop: 8,
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
    padding: 15,
  },
  panel: {},
  item: {
    fontSize: 15,
    color: '#333',
    marginBottom: 12,
  },
});