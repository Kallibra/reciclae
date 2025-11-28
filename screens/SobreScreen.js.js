// screens/SobreScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS } from '../styles/colors';

export default function SobreScreen({ navigation }) {
  const participantes = [
    { nome: 'Gabriela Lobato', funcao: 'Analista de Requisitos' },
    { nome: 'Arthur Cardoso', funcao: 'Analista de Requisitos' },
    { nome: 'Patricia', funcao: 'Analista de Requisitos' },
    { nome: 'Leandro Trindade', funcao: 'Testes (QA)' },
    { nome: 'Juan', funcao: 'Testes (QA)' },
    { nome: 'Julio Ribeiro', funcao: 'Desenvolvedor' },
    { nome: 'Kalebe Guimarães Nunes', funcao: 'Desenvolvedor' },
    { nome: 'Marcos', funcao: 'Coringa / Suporte Geral' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back-ios" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Sobre o App</Text>
        <View style={{ width: 50 }} />
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Logo/Título do projeto */}
        <View style={styles.hero}>
          <Text style={styles.appName}>ReciclaÊ ♻️</Text>
          <Text style={styles.slogan}>Reciclagem que gera renda extra</Text>
        </View>

        {/* Participantes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipe do Projeto</Text>
          {participantes.map((p, i) => (
            <View key={i} style={styles.membro}>
              <Text style={styles.nome}>{p.nome}</Text>
              <Text style={styles.funcao}>{p.funcao}</Text>
            </View>
          ))}
        </View>

        {/* Instituição */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instituição</Text>
          <Text style={styles.texto}>
            Faculdade Estácio de Ananindeua{'\n'}
            Curso de Análise e Desenvolvimento de Sistemas{'\n'}
            Ananindeua – PA • 2025
          </Text>
        </View>

        {/* Orientador */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Orientador</Text>
          <Text style={styles.professor}>Prof. Igor Ernesto</Text>
        </View>

        {/* Texto do projeto (resumido e bonito) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o Projeto de Extensão</Text>
          <Text style={styles.textoJustificado}>
            O ReciclaÊ é uma ponte digital que conecta quem tem lixo reciclável em casa com quem precisa desse material para trabalhar.
            {'\n\n'}
            Usamos gamificação, mapa interativo e recompensas para transformar o descarte correto em hábito — e ainda gerar renda extra para a população.
            {'\n\n'}
            Este aplicativo foi desenvolvido como Projeto de Extensão do curso de ADS da Estácio Ananindeua, unindo tecnologia, sustentabilidade e impacto social real.
          </Text>
        </View>

        {/* ODS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alinhado aos Objetivos da ONU</Text>
          <Text style={styles.ods}>
            ♻️ ODS 11 – Cidades e Comunidades Sustentáveis{'\n'}
            💰 ODS 8 – Trabalho Decente e Crescimento Econômico{'\n'}
            🌍 ODS 12 – Consumo e Produção Responsáveis
          </Text>
        </View>

        {/* Agradecimento final */}
        <View style={styles.final}>
          <Text style={styles.obrigado}>
            Obrigado por fazer parte dessa mudança!{'\n'}
            Juntos, deixamos o Pará mais limpo e mais justo. ♻️❤️
          </Text>
        </View>

        <Text style={styles.version}>Versão MVP • Novembro 2025</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: 90,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  backButton: { padding: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  scroll: { flex: 1, paddingHorizontal: 20 },
  hero: { alignItems: 'center', marginVertical: 30 },
  appName: { fontSize: 36, fontWeight: '900', color: COLORS.primary },
  slogan: { fontSize: 18, color: '#555', marginTop: 8, fontStyle: 'italic' },
  section: { marginBottom: 30 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  membro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  nome: { fontSize: 16, fontWeight: '600', color: '#333' },
  funcao: { fontSize: 14, color: '#666' },
  texto: { fontSize: 16, lineHeight: 24, color: '#444', textAlign: 'center' },
  professor: { fontSize: 18, fontWeight: 'bold', color: COLORS.primary, textAlign: 'center' },
  textoJustificado: { fontSize: 16, lineHeight: 26, color: '#333', textAlign: 'justify' },
  ods: { fontSize: 16, lineHeight: 26, color: '#28a745', textAlign: 'center', fontWeight: '600' },
  final: { alignItems: 'center', marginVertical: 40 },
  obrigado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    lineHeight: 30,
  },
  version: { textAlign: 'center', color: '#aaa', marginBottom: 40, marginTop: 20 },
});