import React, {useContext} from 'react';
import {Text, TextInput, View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {CardContext, CardContextProps, CardField} from '../../contexts/card';
import styles from './styles';

export interface CardFormData {
  number: string;
  expiration: string;
  holder: string;
  securityCode: string;
}

interface CardFormItemProps {
  title: string;
  field: CardField;
}

export const CardFormItem = ({title, field}: CardFormItemProps) => {
  const {
    card: {number, holder, expiration, securityCode},
    setCardFieldValue,
    selectField,
  } = useContext(CardContext) as CardContextProps;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      {
        {
          [CardField.number]: (
            <TextInputMask
              type="credit-card"
              style={styles.input}
              onChangeText={text => {
                setCardFieldValue({
                  field,
                  value: text,
                });
              }}
              value={number ? String(number) : ''}
              onFocus={() => selectField(CardField.number)}
            />
          ),
          [CardField.holder]: (
            <TextInput
              style={styles.input}
              onChangeText={text => {
                setCardFieldValue({
                  field,
                  value: text,
                });
              }}
              value={holder}
              onFocus={() => selectField(CardField.holder)}
            />
          ),
          [CardField.expiration]: (
            <TextInputMask
              type="datetime"
              style={styles.input}
              onChangeText={text => {
                setCardFieldValue({
                  field,
                  value: text,
                });
              }}
              options={{format: 'mm/yy'}}
              value={expiration}
              onFocus={() => selectField(CardField.expiration)}
            />
          ),
          [CardField.securityCode]: (
            <TextInputMask
              type="only-numbers"
              style={styles.input}
              onChangeText={text => {
                setCardFieldValue({
                  field,
                  value: text,
                });
              }}
              maxLength={3}
              value={securityCode ? String(securityCode) : ''}
              onFocus={() => selectField(CardField.securityCode)}
            />
          ),
        }[field]
      }
    </View>
  );
};
