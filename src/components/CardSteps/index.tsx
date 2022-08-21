import React, { useContext, useState } from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { CardContext, CardContextProps } from "../../contexts/card";
import { CardStep, Step } from "./Step";
import { styles } from "./styles";

export const CardSteps = () => {
  const [step, setStep] = useState(CardStep.number);

  const { number, expiration, holder, securityCode, setValue, clearCardData } =
    useContext(CardContext) as CardContextProps;

  const isNextButtonDisabled = {
    [CardStep.number]: !number,
    [CardStep.expiration]: !expiration,
    [CardStep.holder]: !holder,
    [CardStep.security]: !securityCode,
  }[step];

  const handleOnNextStep = () => {
    switch (step) {
      case CardStep.number:
        setStep(CardStep.expiration);
        break;
      case CardStep.expiration:
        setStep(CardStep.holder);
        break;
      case CardStep.holder:
        setStep(CardStep.security);
      case CardStep.security:
        setStep(CardStep.number);
        Alert.alert("Cartão cadastrado com sucesso");
        clearCardData();
        break;
      default:
        break;
    }
  };

  const stepWrapper = (inputValue?: number | string) => (
    <Step
      step={step}
      onChangeInput={(value) => setValue({ step, value })}
      inputValue={inputValue ? String(inputValue) : undefined}
    />
  );

  return (
    <>
      {
        {
          [CardStep.number]: stepWrapper(number),
          [CardStep.expiration]: stepWrapper(expiration),
          [CardStep.holder]: stepWrapper(holder),
          [CardStep.security]: stepWrapper(securityCode),
        }[step]
      }
      <TouchableOpacity
        style={[styles.button, isNextButtonDisabled && styles.disabled]}
        disabled={isNextButtonDisabled}
        onPress={handleOnNextStep}
      >
        <Text style={styles.buttonText}>Próxima etapa</Text>
      </TouchableOpacity>
    </>
  );
};
