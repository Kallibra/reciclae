import { StyleSheet } from 'react-native';
import { colors } from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 40,
  },
  option: {
    backgroundColor: colors.white,
    borderRadius: 20,
    width: '80%',
    paddingVertical: 25,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 4,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});
