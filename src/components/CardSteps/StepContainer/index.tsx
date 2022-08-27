import React, { useContext } from "react";
import { Text, View } from "react-native";
import {
  CardContext,
  CardContextProps,
  CardStep,
} from "../../../contexts/card";
import { Expiration } from "../Expiration";
import { Holder } from "../Holder";
import { Number } from "../Number";
import { SecurityCode } from "../SecurityCode";
import styles from "./styles";

export const StepContainer = () => {
  const { step } = useContext(CardContext) as CardContextProps;

  const stepName = {
    [CardStep.number]: "Número do cartão",
    [CardStep.expiration]: "Data de expiração",
    [CardStep.holder]: "Nome do portador",
    [CardStep.securityCode]: "Código de segurança",
  }[step];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{stepName}</Text>
      {
        {
          [CardStep.number]: <Number />,
          [CardStep.expiration]: <Expiration />,
          [CardStep.holder]: <Holder />,
          [CardStep.securityCode]: <SecurityCode />,
        }[step]
      }
    </View>
  );
};
