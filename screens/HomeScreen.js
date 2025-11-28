// screens/HomeScreen.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import MapView, { Marker, Polygon, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { height: screenHeight } = Dimensions.get('window');

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [userBairro, setUserBairro] = useState('Belém');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ranking');

  const drawerHeight = screenHeight * 0.58;
  const translateY = useRef(new Animated.Value(drawerHeight * 0.6)).current;

  // Centro de Belém (fallback)
  const belemCentro = {
    latitude: -1.4558,
    longitude: -48.4902,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  };

  // Sucatarias reais em Belém
  const sucatarias = [
    { id: 1, nome: 'Sucata do Pará', endereco: 'Av. Almirante Barroso, 1234', latitude: -1.4430, longitude: -48.4800 },
    { id: 2, nome: 'Recicla Belém', endereco: 'Tv. 14 de Março, 1500', latitude: -1.4580, longitude: -48.4950 },
    { id: 3, nome: 'EcoMetal', endereco: 'Av. José Bonifácio, 890', latitude: -1.4600, longitude: -48.4850 },
    { id: 4, nome: 'Sucataria Guamá', endereco: 'Rua dos Mundurucus', latitude: -1.4650, longitude: -48.4700 },
  ];

  // Bairros de Belém com taxa de reciclagem (simulada)
  const bairros = [
    { nome: 'Guamá', reciclagem: 87, coordenadas: [
      { latitude: -1.460, longitude: -48.480 },
      { latitude: -1.470, longitude: -48.475 },
      { latitude: -1.475, longitude: -48.485 },
      { latitude: -1.465, longitude: -48.490 },
    ]},
    { nome: 'Marco', reciclagem: 74, coordenadas: [
      { latitude: -1.430, longitude: -48.465 },
      { latitude: -1.435, longitude: -48.455 },
      { latitude: -1.445, longitude: -48.460 },
      { latitude: -1.440, longitude: -48.470 },
    ]},
    { nome: 'Nazaré', reciclagem: 92, coordenadas: [
      { latitude: -1.455, longitude: -48.495 },
      { latitude: -1.460, longitude: -48.490 },
      { latitude: -1.465, longitude: -48.495 },
      { latitude: -1.460, longitude: -48.500 },
    ]},
    { nome: 'Batista Campos', reciclagem: 68, coordenadas: [
      { latitude: -1.450, longitude: -48.485 },
      { latitude: -1.455, longitude: -48.480 },
      { latitude: -1.460, longitude: -48.485 },
      { latitude: -1.455, longitude: -48.490 },
    ]},
  ];

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        const { latitude, longitude } = loc.coords;

        // Reverse geocoding pra pegar o bairro
        const reverse = await Location.reverseGeocodeAsync({ latitude, longitude });
        const bairro = reverse[0]?.district || reverse[0]?.subregion || 'Belém';

        setLocation({ latitude, longitude, latitudeDelta: 0.03, longitudeDelta: 0.03 });
        setUserBairro(bairro);
      } else {
        Alert.alert('Localização desativada', 'O mapa será exibido em Belém centro');
        setLocation(belemCentro);
      }
    } catch (error) {
      console.log('Erro localização:', error);
      setLocation(belemCentro);
    } finally {
      setLoading(false);
    }
  };

  const getPolygonColor = (percent) => {
    if (percent >= 80) return 'rgba(34, 139, 34, 0.65)';
    if (percent >= 60) return 'rgba(50, 205, 50, 0.6)';
    if (percent >= 40) return 'rgba(173, 255, 47, 0.55)';
    return 'rgba(220, 20, 60, 0.5)';
  };

  const bairroDoUsuario = bairros.find(b => 
    userBairro.toLowerCase().includes(b.nome.toLowerCase()) ||
    b.nome.toLowerCase().includes(userBairro.toLowerCase())
  );

  const mensagemBairro = bairroDoUsuario?.reciclagem >= 80
    ? `Você mora no bairro mais verde de Belém: ${bairroDoUsuario.nome}! 🏆`
    : `Seu bairro (${userBairro}) está com ${bairroDoUsuario?.reciclagem || '??'}% de reciclagem. Vamos melhorar? ♻️`;

  const renderTabContent = () => {
    if (activeTab === 'ranking') {
      const ranking = [...bairros].sort((a, b) => b.reciclagem - a.reciclagem);
      return (
        <View>
          <Text style={styles.sectionTitle}>Ranking de Bairros - Belém</Text>
          {ranking.map((b, i) => (
            <View key={i} style={[styles.rankingItem, bairroDoUsuario?.nome === b.nome && styles.userBairro]}>
              <Text style={styles.rankingPos}>#{i + 1}</Text>
              <Text style={styles.rankingNome}>{b.nome}</Text>
              <Text style={styles.rankingValor}>{b.reciclagem}% ♻️</Text>
            </View>
          ))}
        </View>
      );
    }

    if (activeTab === 'historico') {
      return (
        <View>
          <Text style={styles.sectionTitle}>Seu Histórico</Text>
          <Text style={styles.empty}>Nenhuma coleta registrada ainda</Text>
          <Text style={styles.tip}>Anuncie materiais e suba no ranking do seu bairro!</Text>
        </View>
      );
    }

    return (
      <View>
        <Text style={styles.sectionTitle}>Dicas para Reciclar Melhor</Text>
        <Text style={styles.dica}>• Lave embalagens antes de separar</Text>
        <Text style={styles.dica}>• Amasse latas e garrafas PET</Text>
        <Text style={styles.dica}>• Papel molhado vira lixo orgânico</Text>
        <Text style={styles.dica}>• Eletrônicos têm pontos especiais</Text>
        <Text style={styles.dica}>• Sucataria mais próxima está no mapa!</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Localizando você em Belém...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={location || belemCentro}>
        {/* Marcador do usuário (se tiver localização) */}
        {location && location.latitude !== belemCentro.latitude && (
          <Marker coordinate={location} title="Você está aqui">
            <View style={styles.userMarker}>
              <Icon name="person-pin-circle" size={40} color={COLORS.primary} />
            </View>
          </Marker>
        )}

        {/* Polígonos dos bairros */}
        {bairros.map((bairro, i) => (
          <Polygon
            key={i}
            coordinates={bairro.coordenadas}
            fillColor={getPolygonColor(bairro.reciclagem)}
            strokeColor={bairroDoUsuario?.nome === bairro.nome ? '#fff' : '#333'}
            strokeWidth={bairroDoUsuario?.nome === bairro.nome ? 5 : 2}
            tappable
            onPress={() => Alert.alert(bairro.nome, `${bairro.reciclagem}% de reciclagem`)}
          />
        ))}

        {/* Sucatarias */}
        {sucatarias.map(s => (
          <Marker key={s.id} coordinate={{ latitude: s.latitude, longitude: s.longitude }}>
            <Icon name="recycling" size={38} color={COLORS.primary} />
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{s.nome}</Text>
                <Text style={styles.calloutText}>{s.endereco}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Legenda */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Reciclagem em Belém</Text>
        <View style={styles.legendRow}><View style={[styles.box, { backgroundColor: '#228B22' }]} /><Text style={styles.legendText}>80%+</Text></View>
        <View style={styles.legendRow}><View style={[styles.box, { backgroundColor: '#32CD32' }]} /><Text style={styles.legendText}>60-79%</Text></View>
        <View style={styles.legendRow}><View style={[styles.box, { backgroundColor: '#ADFF2F' }]} /><Text style={styles.legendText}>40-59%</Text></View>
        <View style={styles.legendRow}><View style={[styles.box, { backgroundColor: '#DC143C' }]} /><Text style={styles.legendText}>Abaixo de 40%</Text></View>
      </View>

      {/* Gaveta */}
      <PanGestureHandler onGestureEvent={Animated.event([{ nativeEvent: { translationY: translateY } }], { useNativeDriver: true })}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === 5) {
            if (nativeEvent.translationY < -80) Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
            else Animated.spring(translateY, { toValue: drawerHeight * 0.6, useNativeDriver: true }).start();
          }
        }}>
        <Animated.View style={[styles.drawer, { height: drawerHeight, transform: [{ translateY }] }]}>
          <View style={styles.handle} />
          <Text style={styles.title}>ReciclaÊ em Belém</Text>
          <Text style={styles.subtitle}>Você está em: <Text style={{ fontWeight: 'bold', color: COLORS.primary }}>{userBairro}</Text></Text>
          <Text style={styles.motivation}>{mensagemBairro}</Text>

          <View style={styles.tabBar}>
            {['ranking', 'historico', 'dicas'].map(tab => (
              <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.activeTab]} onPress={() => setActiveTab(tab)}>
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab === 'ranking' ? 'Ranking' : tab === 'historico' ? 'Histórico' : 'Dicas'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={styles.content}>{renderTabContent()}</ScrollView>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  loadingText: { marginTop: 16, fontSize: 16, color: COLORS.primary },
  userMarker: { backgroundColor: '#fff', borderRadius: 25, padding: 4, elevation: 8 },
  legend: { position: 'absolute', top: 60, left: 15, backgroundColor: 'rgba(255,255,255,0.97)', padding: 14, borderRadius: 14, elevation: 8 },
  legendTitle: { fontWeight: 'bold', marginBottom: 8 },
  legendRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 3 },
  box: { width: 16, height: 16, borderRadius: 4, marginRight: 8 },
  legendText: { fontSize: 12, color: '#444' },
  drawer: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopLeftRadius: 28, borderTopRightRadius: 28, elevation: 12 },
  handle: { alignSelf: 'center', width: 60, height: 6, backgroundColor: '#ccc', borderRadius: 3, marginTop: 12 },
  title: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginTop: 10 },
  subtitle: { fontSize: 15, textAlign: 'center', color: '#555', marginTop: 6 },
  motivation: { fontSize: 17, textAlign: 'center', color: '#28a745', fontWeight: 'bold', marginVertical: 16, paddingHorizontal: 20 },
  tabBar: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: '#f0f0f0', borderRadius: 12, overflow: 'hidden' },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  activeTab: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 14, color: '#666', fontWeight: '600' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 16 },
  rankingItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f9f9f9', padding: 14, borderRadius: 12, marginBottom: 10 },
  userBairro: { borderWidth: 2, borderColor: COLORS.primary, backgroundColor: '#e8f5e8' },
  rankingPos: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary },
  rankingNome: { flex: 1, marginLeft: 12, fontSize: 16 },
  rankingValor: { fontWeight: 'bold', color: '#28a745' },
  empty: { textAlign: 'center', color: '#888', fontStyle: 'italic', marginTop: 20 },
  tip: { textAlign: 'center', color: COLORS.primary, marginTop: 10, fontWeight: '600' },
  dica: { fontSize: 15, color: '#444', marginVertical: 6, lineHeight: 22 },
  callout: { backgroundColor: '#fff', padding: 12, borderRadius: 12, width: 200, elevation: 6 },
  calloutTitle: { fontWeight: 'bold', fontSize: 16, color: COLORS.primary },
  calloutText: { fontSize: 13, color: '#555', marginTop: 4 },
});