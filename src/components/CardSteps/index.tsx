import React, { useState } from "react";
import { View } from "react-native";
import { Step } from "./Step";

enum CardStep {
  number = "number",
  expiration = "expiration",
  holder = "holder",
}

export const CardSteps = ({}) => {
  const [step, setStep] = useState(CardStep.number);

  return {
    [CardStep.number]: <Step stepName="Número do cartão" />,
    [CardStep.expiration]: <Step stepName="Data de expiração" />,
    [CardStep.holder]: <Step stepName="Nome do portador" />,
  }[step];
};
