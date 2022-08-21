import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export enum CardStep {
  number = "number",
  expiration = "expiration",
  holder = "holder",
  security = "security",
}

interface StepProps {
  onChangeInput(text: string): void;
  step: CardStep;
  inputValue?: string;
}

export const Step = ({ onChangeInput, step, inputValue }: StepProps) => {
  const stepName = {
    [CardStep.number]: "Número do cartão",
    [CardStep.expiration]: "Data de expiração",
    [CardStep.holder]: "Nome do portador",
    [CardStep.security]: "Código de segurança",
  }[step];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>{stepName}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeInput(text)}
          value={inputValue}
        />
      </View>
    </View>
  );
};
