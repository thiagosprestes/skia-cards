import React, {useContext} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, Text} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {Button, ButtonType} from '../../Button';
import {CardContext, CardContextProps, CardStep} from '../../../contexts/card';
import styles from '../styles';

interface NumberProps {}

interface FormData {
  number: string;
}

export const Number = ({}: NumberProps) => {
  const {setCardFieldValue, changeStep, card} = useContext(
    CardContext,
  ) as CardContextProps;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      number: card.number ? String(card.number) : '',
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
          render={({field: {onChange, onBlur, value}}) => (
            <TextInputMask
              type="credit-card"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={text => {
                setCardFieldValue({
                  step: CardStep.number,
                  value: text,
                });
                onChange(text);
              }}
              value={value}
            />
          )}
          name="number"
        />

        {errors.number && (
          <Text style={styles.errorText}>Campo obrigatório</Text>
        )}
      </View>
      <Button
        text="Próxima etapa"
        onPress={handleSubmit(() => changeStep(CardStep.expiration))}
        type={ButtonType.contained}
      />
    </>
  );
};
