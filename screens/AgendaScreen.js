// screens/AgendaScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function AgendaScreen({ navigation }) {
  const [coletas, setColetas] = useState([]);

  useEffect(() => {
    loadColetas();
  }, []);

  const loadColetas = async () => {
    try {
      const data = await AsyncStorage.getItem('coletas');
      if (data) {
        setColetas(JSON.parse(data));
      }
    } catch (error) {
      console.log('Erro ao carregar coletas', error);
    }
  };

  const cancelarColeta = (id) => {
    Alert.alert(
      'Cancelar coleta?',
      'Tem certeza?',
      [
        { text: 'Não' },
        {
          text: 'Sim',
          onPress: async () => {
            const novas = coletas.filter(c => c.id !== id);
            await AsyncStorage.setItem('coletas', JSON.stringify(novas));
            setColetas(novas);
          }
        }
      ]
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'concluida': return { color: '#28a745', icon: 'checkmark-circle' };
      case 'em_andamento': return { color: '#ffc107', icon: 'time' };
      default: return { color: '#dc3545', icon: 'alert-circle' };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Agenda</Text>

      <ScrollView style={styles.scroll}>
        {coletas.length === 0 ? (
          <Text style={styles.empty}>Nenhuma coleta agendada</Text>
        ) : (
          coletas.map(coleta => {
            const status = getStatusStyle(coleta.status);
            return (
              <View key={coleta.id} style={styles.card}>
                <View style={styles.header}>
                  <View style={styles.statusRow}>
                    <Icon name={status.icon} size={20} color={status.color} />
                    <Text style={[styles.status, { color: status.color }]}>
                      {coleta.status.toUpperCase()}
                    </Text>
                  </View>
                  {coleta.status === 'pendente' && (
                    <TouchableOpacity onPress={() => cancelarColeta(coleta.id)}>
                      <Text style={styles.cancelar}>Cancelar</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={styles.data}>{coleta.data} • {coleta.hora}</Text>
                <Text style={styles.materiais}>{coleta.materiais.join(' • ')}</Text>
                <Text style={styles.endereco}>{coleta.endereco}</Text>

                {coleta.status === 'concluida' && (
                  <View style={styles.gamificacao}>
                    <Text style={styles.kg}>+{coleta.kg}kg reciclados</Text>
                    <Text style={styles.estrelas}>+{coleta.estrelas} estrelas</Text>
                  </View>
                )}
              </View>
            );
          })
        )}
      </ScrollView>

      {/* BOTÃO FLUTUANTE */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AnunciarMaterial')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center', marginBottom: 20 },

  scroll: { flex: 1, paddingHorizontal: 20 },
  empty: { textAlign: 'center', color: '#666', fontSize: 16, marginTop: 50 },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  status: { fontWeight: 'bold', marginLeft: 6, fontSize: 14 },
  cancelar: { color: '#dc3545', fontWeight: '600' },

  data: { fontSize: 16, fontWeight: '600', color: '#333' },
  materiais: { color: '#555', marginVertical: 6 },
  endereco: { color: '#777', fontSize: 13 },

  gamificacao: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  kg: { color: COLORS.primary, fontWeight: 'bold' },
  estrelas: { color: '#ffd700', fontWeight: 'bold' },

  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});