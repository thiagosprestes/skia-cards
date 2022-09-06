/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {CardContext, CardContextProps, CardField} from '../../contexts/card';
import {Button, ButtonType} from '../Button';
import {CardFormItem} from '../CardFormItem';
import Snackbar from 'react-native-snackbar';
import styles from './styles';
import {useNfc} from '../../hooks/useNfc';
import {
  CardBrand,
  cardBrandsColors,
  getCardBrand,
} from '../../utils/cardBrands';

interface CardFormProps {
  onCancel(): void;
}

export const CardForm = ({onCancel}: CardFormProps) => {
  const [cardBrand, setCardBrand] = useState(CardBrand.default);

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
        !isExpirationYearValid ||
        (currentMonth >= expirationMonth && !isExpirationYearValid);

      console.log(expirationMonth);

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

  useEffect(() => {
    const brand = getCardBrand(card.number!);

    if (brand) {
      setCardBrand(CardBrand[brand]);
      return;
    }

    setCardBrand(CardBrand.default);
  }, [card.number]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
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
        cardBrand={cardBrand && cardBrandsColors[cardBrand][1]}
        onPress={handleOnSubmit}
        text="Salvar cartão"
        type={ButtonType.contained}
      />
      <Button onPress={onCancel} text="Cenelar" type={ButtonType.outlined} />
    </ScrollView>
  );
};
