import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, Alert, Keyboard } from "react-native";
import { Button, ButtonType } from "../../Button";
import styles from "../styles";
import {
  CardContext,
  CardContextProps,
  CardStep,
} from "../../../contexts/card";
import { TextInputMask } from "react-native-masked-text";

interface FormData {
  securityCode: string;
}

export const SecurityCode = () => {
  const { changeStep, clearCardData, setCardFieldValue } = useContext(
    CardContext
  ) as CardContextProps;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      securityCode: "",
    },
  });

  const onSubmit = handleSubmit(() => {
    Keyboard.dismiss();
    Alert.alert("Cartão cadastrado com sucesso");
    clearCardData();
  });

  const onGoToPreviousStep = () => changeStep(CardStep.expiration);

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
              type="only-numbers"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
                setCardFieldValue({
                  step: CardStep.securityCode,
                  value,
                });
              }}
              value={value}
              maxLength={3}
            />
          )}
          name="securityCode"
        />

        {errors.securityCode && (
          <Text style={styles.errorText}>Campo obrigatório</Text>
        )}
      </View>
      <Button
        text="Etapa anterior"
        onPress={onGoToPreviousStep}
        type={ButtonType.outlined}
      />
      <Button
        text="Próxima etapa"
        onPress={onSubmit}
        type={ButtonType.contained}
      />
    </>
  );
};
