import { StyleSheet } from 'react-native';
import { COLORS } from './colors'; // certo: COLORS

export const formStyles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    color: COLORS.textDark, // <-- corrigido
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
    backgroundColor: COLORS.primary, // <-- corrigido
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
