import { StyleSheet, Dimensions } from 'react-native';
import { colors } from './colors';

const { width } = Dimensions.get('window');

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
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
    backgroundColor: '#eee',
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
    color: colors.gray,
    fontWeight: '600',
    fontSize: 13,
  },
  switchTextActive: {
    color: colors.textLight,
  },
  switchSlider: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 25,
    zIndex: 1,
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 30,
  },
});
