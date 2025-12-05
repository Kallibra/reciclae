// screens/HomeScreen.js → VERSÃO FINAL ÉPICA COM SUCATARIAS CLICÁVEIS TIPO IFOOD!
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
  Modal,
  Linking,
} from 'react-native';
import MapView, { Marker, Polygon, Callout, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../styles/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [userLocal, setUserLocal] = useState('Carregando...');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ranking');
  const [selectedSucataria, setSelectedSucataria] = useState(null);

  const drawerHeight = screenHeight * 0.58;
  const translateY = useRef(new Animated.Value(drawerHeight * 0.6)).current;

  const belemCentro = { latitude: -1.4558, longitude: -48.4902, latitudeDelta: 0.08, longitudeDelta: 0.08 };

  // SUCATARIAS COM TODOS OS DADOS (clicáveis tipo iFood)
  const sucatarias = [
    {
      id: 1,
      nome: 'Sucata do Pará',
      endereco: 'Av. Almirante Barroso, 1234 - Marco',
      telefone: '(91) 98888-7777',
      whatsapp: '91988887777',
      latitude: -1.4430,
      longitude: -48.4800,
      precoPlastico: 'R$ 2,50/kg',
      precoMetal: 'R$ 8,00/kg',
      precoPapel: 'R$ 1,20/kg',
      horario: 'Seg-Sex: 8h às 18h | Sáb: 8h às 14h',
      rating: 4.8,
      reviews: 127,
    },
    {
      id: 2,
      nome: 'Recicla Belém',
      endereco: 'Tv. 14 de Março, 1500 - Guamá',
      telefone: '(91) 97777-6666',
      whatsapp: '91977776666',
      latitude: -1.4580,
      longitude: -48.4950,
      precoPlastico: 'R$ 2,80/kg',
      precoMetal: 'R$ 9,50/kg',
      precoPapel: 'R$ 1,50/kg',
      horario: 'Seg-Sáb: 7h às 19h',
      rating: 4.9,
      reviews: 203,
    },
    {
      id: 3,
      nome: 'EcoMetal',
      endereco: 'Av. José Bonifácio, 890 - Nazaré',
      telefone: '(91) 96666-5555',
      whatsapp: '91966665555',
      latitude: -1.4600,
      longitude: -48.4850,
      precoPlastico: 'R$ 2,30/kg',
      precoMetal: 'R$ 7,80/kg',
      precoPapel: 'R$ 1,30/kg',
      horario: 'Seg-Sex: 8h às 17h',
      rating: 4.6,
      reviews: 89,
    },
    {
      id: 4,
      nome: 'Sucataria Guamá',
      endereco: 'Rua dos Mundurucus - Guamá',
      telefone: '(91) 95555-4444',
      whatsapp: '91955554444',
      latitude: -1.4650,
      longitude: -48.4700,
      precoPlastico: 'R$ 2,60/kg',
      precoMetal: 'R$ 8,70/kg',
      precoPapel: 'R$ 1,40/kg',
      horario: 'Todos os dias: 7h às 20h',
      rating: 5.0,
      reviews: 312,
    },
  ];

  // BAIRROS
  const bairros = [
    {
      nome: 'Guamá',
      reciclagem: 87,
      coordenadas: [
        { latitude: -1.4685, longitude: -48.4890 },
        { latitude: -1.4720, longitude: -48.4820 },
        { latitude: -1.4765, longitude: -48.4775 },
        { latitude: -1.4800, longitude: -48.4720 },
        { latitude: -1.4750, longitude: -48.4680 },
        { latitude: -1.4700, longitude: -48.4700 },
        { latitude: -1.4650, longitude: -48.4750 },
        { latitude: -1.4620, longitude: -48.4800 },
        { latitude: -1.4600, longitude: -48.4850 },
        { latitude: -1.4625, longitude: -48.4900 },
        { latitude: -1.4685, longitude: -48.4890 },
      ],
    },
    {
      nome: 'Marco',
      reciclagem: 74,
      coordenadas: [
        { latitude: -1.4280, longitude: -48.4680 },
        { latitude: -1.4320, longitude: -48.4600 },
        { latitude: -1.4370, longitude: -48.4550 },
        { latitude: -1.4420, longitude: -48.4520 },
        { latitude: -1.4450, longitude: -48.4580 },
        { latitude: -1.4400, longitude: -48.4650 },
        { latitude: -1.4350, longitude: -48.4700 },
        { latitude: -1.4300, longitude: -48.4750 },
        { latitude: -1.4250, longitude: -48.4700 },
        { latitude: -1.4280, longitude: -48.4680 },
      ],
    },
    {
      nome: 'Nazaré',
      reciclagem: 92,
      coordenadas: [
        { latitude: -1.4520, longitude: -48.4980 },
        { latitude: -1.4560, longitude: -48.4920 },
        { latitude: -1.4600, longitude: -48.4880 },
        { latitude: -1.4630, longitude: -48.4920 },
        { latitude: -1.4660, longitude: -48.4970 },
        { latitude: -1.4620, longitude: -48.5020 },
        { latitude: -1.4580, longitude: -48.5000 },
        { latitude: -1.4540, longitude: -48.5030 },
        { latitude: -1.4500, longitude: -48.5000 },
        { latitude: -1.4520, longitude: -48.4980 },
      ],
    },
    {
      nome: 'Batista Campos',
      reciclagem: 38,
      coordenadas: [
        { latitude: -1.4480, longitude: -48.4880 },
        { latitude: -1.4520, longitude: -48.4820 },
        { latitude: -1.4570, longitude: -48.4780 },
        { latitude: -1.4600, longitude: -48.4820 },
        { latitude: -1.4580, longitude: -48.4870 },
        { latitude: -1.4540, longitude: -48.4900 },
        { latitude: -1.4500, longitude: -48.4920 },
        { latitude: -1.4460, longitude: -48.4900 },
        { latitude: -1.4440, longitude: -48.4850 },
        { latitude: -1.4480, longitude: -48.4880 },
      ],
    },
  ];

  useEffect(() => {
    pegarLocalizacaoReal();
  }, []);

  const pegarLocalizacaoReal = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation(belemCentro);
        setUserLocal('Pará');
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      const { latitude, longitude } = loc.coords;

      const endereco = await Location.reverseGeocodeAsync({ latitude, longitude });
      const bairro = endereco[0]?.district || endereco[0]?.subregion || endereco[0]?.sublocality || '';
      const cidade = endereco[0]?.city || 'Belém';

      const nomeFinal = bairro ? `${bairro} – ${cidade}` : cidade;

      setLocation({ latitude, longitude, latitudeDelta: 0.03, longitudeDelta: 0.03 });
      setUserLocal(nomeFinal);
    } catch (e) {
      setLocation(belemCentro);
      setUserLocal('Belém – PA');
    } finally {
      setLoading(false);
    }
  };

  const corPoligono = (pct) => {
    if (pct >= 80) return 'rgba(34,139,34,0.7)';
    if (pct >= 60) return 'rgba(50,205,50,0.65)';
    if (pct >= 40) return 'rgba(173,255,47,0.6)';
    return 'rgba(220,20,60,0.6)';
  };

  const bairroUsuario = bairros.find(b => userLocal.toLowerCase().includes(b.nome.toLowerCase()));

  const mensagem = bairroUsuario
    ? `Seu bairro ${bairroUsuario.nome} está com ${bairroUsuario.reciclagem}% de reciclagem! ♻️`
    : `Você está em ${userLocal} — o ranking é de Belém, mas o app já funciona na sua cidade!`;

  const renderTabContent = () => {
    if (activeTab === 'ranking') {
      const ranking = [...bairros].sort((a, b) => b.reciclagem - a.reciclagem);
      return (
        <View>
          <Text style={styles.sectionTitle}>Ranking de Bairros – Belém</Text>
          {ranking.map((b, i) => (
            <View key={i} style={[styles.rankingItem, bairroUsuario?.nome === b.nome && styles.destaqueUsuario]}>
              <Text style={styles.pos}>#{i + 1}</Text>
              <Text style={styles.nomeBairro}>{b.nome}</Text>
              <Text style={styles.valor}>{b.reciclagem}% ♻️</Text>
            </View>
          ))}
        </View>
      );
    }

    if (activeTab === 'historico') {
      return (
        <View>
          <Text style={styles.sectionTitle}>Seu Histórico</Text>
          <Text style={styles.emptyState}>Nenhuma coleta registrada ainda</Text>
        </View>
      );
    }

    return (
      <View>
        <Text style={styles.sectionTitle}>Dicas de Reciclagem</Text>
        <Text style={styles.dica}>• Lave as embalagens antes</Text>
        <Text style={styles.dica}>• Amasse latas e garrafas PET</Text>
        <Text style={styles.dica}>• Óleo de cozinha vira biodiesel</Text>
        <Text style={styles.dica}>• Pilhas em pontos especiais</Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Localizando você no Pará...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* MAPA */}
      <MapView style={styles.map} region={location || belemCentro}>
        <UrlTile urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" maximumZ={19} />

        {/* PIN DO USUÁRIO */}
        <Marker coordinate={location}>
          <View style={styles.pinWrapper}>
            <Icon name="person-pin-circle" size={48} color={COLORS.primary} />
          </View>
        </Marker>

        {/* POLÍGONOS DOS BAIRROS */}
        {bairros.map((b, i) => (
          <Polygon
            key={i}
            coordinates={b.coordenadas}
            fillColor={corPoligono(b.reciclagem)}
            strokeColor={bairroUsuario?.nome === b.nome ? '#fff' : '#333'}
            strokeWidth={bairroUsuario?.nome === b.nome ? 6 : 2}
            tappable
            onPress={() => Alert.alert(b.nome, `${b.reciclagem}% de reciclagem`)}
          />
        ))}

        {/* SUCATARIAS CLICÁVEIS */}
        {sucatarias.map(s => (
          <Marker
            key={s.id}
            coordinate={{ latitude: s.latitude, longitude: s.longitude }}
            onPress={() => setSelectedSucataria(s)}
          >
            <View style={styles.sucatariaPin}>
              <Icon name="recycling" size={40} color="#fff" />
            </View>
          </Marker>
        ))}
      </MapView>

      {/* MODAL DETALHES DA SUCATARIA */}
      <Modal visible={!!selectedSucataria} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedSucataria && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedSucataria.nome}</Text>
                  <TouchableOpacity onPress={() => setSelectedSucataria(null)}>
                    <Icon name="close" size={28} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.ratingRow}>
                  <Icon name="star" size={24} color="#ffd700" />
                  <Text style={styles.rating}>{selectedSucataria.rating} ({selectedSucataria.reviews} avaliações)</Text>
                </View>

                <Text style={styles.modalInfo}>📍 {selectedSucataria.endereco}</Text>
                <Text style={styles.modalInfo}>📞 {selectedSucataria.telefone}</Text>
                <Text style={styles.modalInfo}>🕐 {selectedSucataria.horario}</Text>

                <View style={styles.precos}>
                  <Text style={styles.precoItem}>Plástico: {selectedSucataria.precoPlastico}</Text>
                  <Text style={styles.precoItem}>Metal: {selectedSucataria.precoMetal}</Text>
                  <Text style={styles.precoItem}>Papel: {selectedSucataria.precoPapel}</Text>
                </View>

                <TouchableOpacity
                  style={styles.botaoWhats}
                  onPress={() => Linking.openURL(`whatsapp://send?phone=${selectedSucataria.whatsapp}`)}
                >
                  <Icon name="logo-whatsapp" size={28} color="#fff" />
                  <Text style={styles.botaoWhatsText}>Falar no WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botaoFechar} onPress={() => setSelectedSucataria(null)}>
                  <Text style={styles.botaoFecharText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* LEGENDA */}
      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Nível de Reciclagem</Text>
        <View style={styles.legendItem}><View style={[styles.box, {backgroundColor: '#228B22'}]} /><Text>80%+</Text></View>
        <View style={styles.legendItem}><View style={[styles.box, {backgroundColor: '#32CD32'}]} /><Text>60-79%</Text></View>
        <View style={styles.legendItem}><View style={[styles.box, {backgroundColor: '#ADFF2F'}]} /><Text>40-59%</Text></View>
        <View style={styles.legendItem}><View style={[styles.box, {backgroundColor: '#9feea9ff'}]} /><Text>40%</Text></View>
      </View>

      {/* GAVETA */}
      <PanGestureHandler
        onGestureEvent={Animated.event([{ nativeEvent: { translationY: translateY } }], { useNativeDriver: true })}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === 5) {
            if (nativeEvent.translationY < -80) {
              Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
            } else {
              Animated.spring(translateY, { toValue: drawerHeight * 0.6, useNativeDriver: true }).start();
            }
          }
        }}>
        <Animated.View style={[styles.drawer, { height: drawerHeight, transform: [{ translateY }] }]}>
          <View style={styles.handle} />
          <Text style={styles.title}>ReciclAÊ</Text>
          <Text style={styles.subtitle}>Você está em:</Text>
          <Text style={styles.localAtual}>{userLocal}</Text>
          <Text style={styles.motivation}>{mensagem}</Text>

          <View style={styles.tabBar}>
            {['ranking', 'historico', 'dicas'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}>
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
  loadingText: { marginTop: 15, fontSize: 16, color: COLORS.primary },

  pinWrapper: { backgroundColor: '#fff', borderRadius: 30, padding: 4, elevation: 10 },

  sucatariaPin: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 10,
  },

  legend: { position: 'absolute', top: 60, left: 12, backgroundColor: 'rgba(255,255,255,0.95)', padding: 12, borderRadius: 12, elevation: 8 },
  legendTitle: { fontWeight: 'bold', marginBottom: 6 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 2 },
  box: { width: 16, height: 16, borderRadius: 4, marginRight: 8 },

  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    elevation: 15,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  handle: { width: 60, height: 6, backgroundColor: '#ddd', borderRadius: 3, alignSelf: 'center', marginVertical: 8 },
  title: { fontSize: 26, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center' },
  subtitle: { fontSize: 15, color: '#666', textAlign: 'center', marginTop: 4 },
  localAtual: { fontSize: 21, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginVertical: 8 },
  motivation: { fontSize: 17, textAlign: 'center', color: '#2e7d32', fontWeight: '600', marginVertical: 12 },

  tabBar: { flexDirection: 'row', backgroundColor: '#f0f0f0', borderRadius: 12, overflow: 'hidden', marginVertical: 12 },
  tab: { flex: 1, paddingVertical: 14, alignItems: 'center' },
  activeTab: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 14, color: '#555', fontWeight: '600' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },

  content: { flex: 1 },
  sectionTitle: { fontSize: 19, fontWeight: 'bold', color: COLORS.primary, marginBottom: 14 },
  rankingItem: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f8f8f8', padding: 16, borderRadius: 12, marginBottom: 10 },
  destaqueUsuario: { borderWidth: 3, borderColor: COLORS.primary, backgroundColor: '#e8f5e8' },
  pos: { fontSize: 20, fontWeight: 'bold', color: COLORS.primary },
  nomeBairro: { flex: 1, marginHorizontal: 12, fontSize: 16 },
  valor: { fontSize: 17, fontWeight: 'bold', color: '#2e7d32' },
  emptyState: { textAlign: 'center', color: '#888', fontStyle: 'italic', marginTop: 30 },
  dica: { fontSize: 15, color: '#444', lineHeight: 24, marginVertical: 4 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', width: '90%', borderRadius: 20, padding: 20, elevation: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.primary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  rating: { marginLeft: 8, fontSize: 16, fontWeight: 'bold' },
  modalInfo: { fontSize: 16, color: '#333', marginVertical: 6 },
  precos: { marginVertical: 15 },
  precoItem: { fontSize: 16, color: '#27ae60', fontWeight: '600' },
  botaoWhats: {
    backgroundColor: '#25D366',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
  },
  botaoWhatsText: { color: '#fff', fontWeight: 'bold', marginLeft: 10 },
  botaoFechar: {
    backgroundColor: '#eee',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoFecharText: { color: '#333', fontWeight: 'bold' },
});