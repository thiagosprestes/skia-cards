import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, Text, TextInput} from 'react-native';
import {Button, ButtonType} from '../../Button';
import styles from '../styles';
import {CardContext, CardContextProps, CardStep} from '../../../contexts/card';

interface FormData {
  holder: string;
}

export const Holder = () => {
  const {
    setCardFieldValue,
    changeStep,
    card: {holder},
  } = useContext(CardContext) as CardContextProps;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      holder,
    },
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
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={text => {
                onChange(text);
                setCardFieldValue({
                  step: CardStep.holder,
                  value: text,
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
        text="Etapa anterior"
        onPress={onGoToPreviousStep}
        type={ButtonType.outlined}
      />
      <Button
        text="Próxima etapa"
        onPress={handleSubmit(() => changeStep(CardStep.securityCode))}
        type={ButtonType.contained}
      />
    </>
  );
};
