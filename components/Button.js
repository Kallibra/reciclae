import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export default function Button({ title, onPress, color = COLORS.primary, style }) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});