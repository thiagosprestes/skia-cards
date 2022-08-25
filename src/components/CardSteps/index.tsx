import React, { useContext, useState } from "react";
import { TouchableOpacity, Text, Alert, Keyboard } from "react-native";
import { CardContext, CardContextProps } from "../../contexts/card";
import { CardStep, Step } from "./Step";
import { styles } from "./styles";

export const CardSteps = () => {
  const { setCardFieldValue, clearCardData, changeStep, step, card } =
    useContext(CardContext) as CardContextProps;

  const isNextButtonDisabled = !card[step];

  const handleOnNextStep = () => {
    switch (step) {
      case CardStep.number:
        changeStep(CardStep.expiration);
        break;
      case CardStep.expiration:
        changeStep(CardStep.holder);
        break;
      case CardStep.holder:
        changeStep(CardStep.securityCode);
        break;
      case CardStep.securityCode:
        Keyboard.dismiss();
        Alert.alert("Cartão cadastrado com sucesso");
        clearCardData();
        break;
      default:
        break;
    }
  };

  const handleOnPreviousStep = () => {
    switch (step) {
      case CardStep.expiration:
        changeStep(CardStep.number);
        break;
      case CardStep.holder:
        changeStep(CardStep.expiration);
        break;
      case CardStep.securityCode:
        changeStep(CardStep.holder);
        break;
      default:
        break;
    }
  };

  const stepWrapper = (inputValue?: number | string) => (
    <Step
      step={step}
      onChangeInput={(value) => setCardFieldValue({ step, value })}
      inputValue={inputValue ? String(inputValue) : undefined}
    />
  );

  return (
    <>
      {stepWrapper(card[step])}
      <TouchableOpacity
        style={[styles.button, isNextButtonDisabled && styles.disabled]}
        disabled={isNextButtonDisabled}
        onPress={handleOnNextStep}
      >
        <Text style={styles.buttonText}>Próxima etapa</Text>
      </TouchableOpacity>
      {step !== CardStep.number && (
        <TouchableOpacity
          style={[styles.button, styles.previousButton]}
          onPress={handleOnPreviousStep}
        >
          <Text style={[styles.buttonText, styles.previousButtonText]}>
            Etapa anterior
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};
