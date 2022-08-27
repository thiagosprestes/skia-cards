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
  const { setCardFieldValue, changeStep } = useContext(
    CardContext
  ) as CardContextProps;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      expirationDate: "",
    },
  });

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
          <Text style={stepStyles.errorText}>Campo obrigatório</Text>
        )}
      </View>
      <Button
        text="Próxima etapa"
        onPress={handleSubmit(() => changeStep(CardStep.holder))}
        type={ButtonType.contained}
      />
    </>
  );
};
