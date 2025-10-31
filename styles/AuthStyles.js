// styles/AuthStyles.js
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from './colors';  // ← CORRETO: './colors' e 'COLORS'

const { width } = Dimensions.get('window');

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 4,
  },
  switchContainer: {
    alignItems: 'center',
    marginTop: -20,
  },
  switchBackground: {
    flexDirection: 'row',
    width: width * 0.8,
    height: 45,
    backgroundColor: COLORS.light,
    borderRadius: 25,
    position: 'relative',
    overflow: 'hidden',
  },
  switchButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  switchText: {
    color: COLORS.darkGray,
    fontWeight: '600',
    fontSize: 13,
  },
  switchTextActive: {
    color: COLORS.white,
  },
  switchSlider: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    zIndex: 1,
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 30,
  },
});