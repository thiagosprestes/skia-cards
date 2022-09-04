import React, {useContext, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Alert, ScrollView, Text, View} from 'react-native';
import {CardContext, CardContextProps, CardField} from '../../contexts/card';
import {Button, ButtonType} from '../Button';
import {CardFormData, CardFormItem} from '../CardFormItem';
import Snackbar from 'react-native-snackbar';

import styles from './styles';

export const CardForm = () => {
  const {card, clearCardData} = useContext(CardContext) as CardContextProps;

  const handleOnSubmit = () => {
    const isFormIncomplete =
      !card.expiration || !card.holder || !card.number || !card.securityCode;

    if (isFormIncomplete) {
      Snackbar.show({
        text: 'Preencha todos os campos',
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }

    if (card.expiration) {
      const currentYear = Number(
        new Date().getFullYear().toString().slice(2, 4),
      );
      const currentMonth = Number((new Date().getMonth() + 1).toString());

      const splittedExpiration = card.expiration?.split('/');

      const expirationMonth = Number(splittedExpiration![0]);
      const expirationYear = Number(splittedExpiration![1]);

      const isValidMonth = expirationMonth >= 1 && expirationMonth <= 12;

      const isExpirationYearValid = expirationYear >= currentYear;

      const isExpired =
        !isExpirationYearValid || currentMonth >= expirationMonth;

      if (!isValidMonth) {
        Snackbar.show({
          text: 'Insira uma data de expiração válida',
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }

      if (isExpired) {
        Snackbar.show({
          text: 'Cartão já expirado',
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }

      Alert.alert('Cartão salvo com sucesso!!');
      clearCardData();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Insira os dados ou aproxime um cartão</Text>
      <View style={styles.container}>
        <CardFormItem title="Número" field={CardField.number} />
        <CardFormItem title="Nome do titular" field={CardField.holder} />
        <View style={styles.columns}>
          <CardFormItem
            title="Data de expiração"
            field={CardField.expiration}
          />
          <CardFormItem
            title="Código de segurança"
            field={CardField.securityCode}
          />
        </View>
      </View>
      <Button
        onPress={handleOnSubmit}
        text="Salvar cartão"
        type={ButtonType.outlined}
      />
    </ScrollView>
  );
};
