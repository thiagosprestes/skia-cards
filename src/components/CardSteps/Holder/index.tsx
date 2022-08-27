import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { View, Text, TextInput } from "react-native";
import { Button, ButtonType } from "../../Button";
import styles from "../styles";
import {
  CardContext,
  CardContextProps,
  CardStep,
} from "../../../contexts/card";

interface FormData {
  holder: string;
}

export const Holder = () => {
  const { setCardFieldValue, changeStep } = useContext(
    CardContext
  ) as CardContextProps;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      holder: "",
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
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => {
                onChange(value);
                setCardFieldValue({
                  step: CardStep.holder,
                  value,
                });
              }}
              value={value}
            />
          )}
          name="holder"
        />

        {errors.holder && (
          <Text style={styles.errorText}>Campo obrigatório</Text>
        )}
      </View>
      <Button
        text="Próxima etapa"
        onPress={handleSubmit(() => changeStep(CardStep.securityCode))}
        type={ButtonType.contained}
      />
    </>
  );
};
