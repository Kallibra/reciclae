import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const formStyles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    color: colors.textDark,
    fontSize: 13,
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 20,
    paddingVertical: 5,
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
