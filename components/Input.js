import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export default function Input({ placeholder, ...props }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={COLORS.gray}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 8,
  },
});