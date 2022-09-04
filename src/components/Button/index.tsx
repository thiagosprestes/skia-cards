import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import styles from './styles';

export enum ButtonType {
  contained = 'contained',
  outlined = 'outlined',
}

interface ButtonProps {
  onPress(): void;
  text: String;
  type: ButtonType;
  cardBrand?: string;
}

export const Button = ({onPress, text, type, cardBrand}: ButtonProps) => {
  const isButtonTypeContained = type === ButtonType.contained;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={StyleSheet.flatten([
        styles.button,
        isButtonTypeContained ? styles.contained : styles.outlined,
        cardBrand
          ? {
              backgroundColor: cardBrand,
            }
          : undefined,
      ])}>
      <Text
        style={[
          styles.buttonText,
          isButtonTypeContained ? styles.textContained : styles.textOutlined,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
