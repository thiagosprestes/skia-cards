import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { Button, ButtonType } from "../../Button";
import stepStyles from "../styles";
import {
  CardContext,
  CardContextProps,
  CardStep,
} from "../../../contexts/card";
import styles from "../styles";

interface FormData {
  expirationDate: string;
}

export const Expiration = () => {
  const { setCardFieldValue, changeStep, card } = useContext(
    CardContext
  ) as CardContextProps;

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      expirationDate: card.expiration,
    },
  });

  const onGoToPreviousStep = () => changeStep(CardStep.number);

  const onValidateStep = () => {
    if (!card.expiration) {
      setError("expirationDate", {
        message: "Campo obrigatório",
      });
      return;
    }

    handleSubmit(onGoToNextStep)();
  };

  const onGoToNextStep = () => {
    const currentYear = Number(new Date().getFullYear().toString().slice(2, 4));
    const currentMonth = Number((new Date().getMonth() + 1).toString());

    const splittedExpiration = card.expiration?.split("/");

    const expirationMonth = Number(splittedExpiration![0]);
    const expirationYear = Number(splittedExpiration![1]);

    const isValidMonth = expirationMonth >= 1 && expirationMonth <= 12;

    const isExpirationYearValid = expirationYear >= currentYear;

    const isExpired = !isExpirationYearValid || currentMonth >= expirationMonth;

    if (!isValidMonth) {
      setError("expirationDate", {
        message: "Insira uma data de expiração válida",
      });
      return;
    }

    if (isExpired) {
      setError("expirationDate", {
        message: "Cartão já expirado",
      });
      return;
    }

    changeStep(CardStep.holder);
  };

  return (
    <>
      <View style={styles.container}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInputMask
              type="datetime"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
                setCardFieldValue({
                  step: CardStep.expiration,
                  value,
                });
              }}
              value={value}
              options={{
                format: "MM/YY",
              }}
            />
          )}
          name="expirationDate"
        />
        {errors.expirationDate && (
          <Text style={stepStyles.errorText}>
            {errors.expirationDate.message}
          </Text>
        )}
      </View>
      <Button
        text="Etapa anterior"
        onPress={onGoToPreviousStep}
        type={ButtonType.outlined}
      />
      <Button
        text="Próxima etapa"
        onPress={onValidateStep}
        type={ButtonType.contained}
      />
    </>
  );
};
