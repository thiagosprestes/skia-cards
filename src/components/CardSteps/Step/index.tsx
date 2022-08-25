import React from "react";
import { Text, TextInput, View } from "react-native";
import { TextInputMask, TextInputMaskTypeProp } from "react-native-masked-text";
import { styles } from "./styles";

export enum CardStep {
  number = "number",
  expiration = "expiration",
  holder = "holder",
  securityCode = "securityCode",
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
    [CardStep.securityCode]: "Código de segurança",
  }[step];

  const renderInput = (type: TextInputMaskTypeProp) => (
    <TextInputMask
      type={type}
      style={styles.input}
      onChangeText={(text) => onChangeInput(text)}
      value={inputValue}
      options={{
        format: "MM/YY",
      }}
      maxLength={type === "only-numbers" ? 3 : undefined}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>{stepName}</Text>
        {
          {
            [CardStep.number]: renderInput("credit-card"),
            [CardStep.expiration]: renderInput("datetime"),
            [CardStep.holder]: (
              <TextInput
                style={styles.input}
                onChangeText={(text) => onChangeInput(text)}
                value={inputValue}
                maxLength={23}
              />
            ),
            [CardStep.securityCode]: renderInput("only-numbers"),
          }[step]
        }
      </View>
    </View>
  );
};
