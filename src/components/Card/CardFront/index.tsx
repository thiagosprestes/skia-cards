import React from 'react';
import {Group, Rect, Text, useFont} from '@shopify/react-native-skia';
import RobotoBold from '../../../../assets/fonts/Roboto-Bold.ttf';
import {CardField} from '../../../contexts/card';

interface CardFront {
  cardNumber?: number;
  cardExpiration?: string;
  cardHolder?: string;
  selectedField?: CardField | null;
}

export const CardFront = ({
  cardNumber,
  cardExpiration,
  cardHolder,
  selectedField,
}: CardFront) => {
  const fontBold = useFont(RobotoBold, 16);

  if (!fontBold) {
    return <></>;
  }

  return (
    <Group>
      <Text
        x={20}
        y={125}
        text={cardNumber ? String(cardNumber) : 'XXXX XXXX XXXX XXXX XXXX'}
        font={fontBold}
        color="#fff"
      />
      {selectedField === CardField.number && (
        <Rect height={2} width={220} color="#fff" x={20} y={130} />
      )}
      <Text
        x={20}
        y={175}
        text={cardExpiration ?? '00/00'}
        font={fontBold}
        color="#fff"
      />
      {selectedField === CardField.expiration && (
        <Rect height={2} width={45} color="#fff" x={20} y={180} />
      )}
      <Text
        x={80}
        y={175}
        text={cardHolder ?? 'NOME'}
        font={fontBold}
        color="#fff"
      />
      {selectedField === CardField.holder && (
        <Rect height={2} width={200} color="#fff" x={80} y={180} />
      )}
    </Group>
  );
};
