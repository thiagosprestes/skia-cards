import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import styles from "./styles";

export enum ButtonType {
  contained = "contained",
  outlined = "outlined",
}

interface ButtonProps {
  onPress(): void;
  text: String;
  type: ButtonType;
}

export const Button = ({ onPress, text, type }: ButtonProps) => {
  const isButtonTypeContained = type === ButtonType.contained;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        isButtonTypeContained ? styles.contained : styles.outlined,
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          isButtonTypeContained ? styles.textContained : styles.textOutlined,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
