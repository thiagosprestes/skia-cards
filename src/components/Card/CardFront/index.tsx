import React, {useEffect} from 'react';
import {
  Group,
  Image,
  Rect,
  Text,
  useFont,
  useImage,
  useSharedValueEffect,
  useValue,
} from '@shopify/react-native-skia';
import RobotoBold from '../../../../assets/fonts/Roboto-Bold.ttf';
import chipIcon from '../../../assets/chip.png';
import {CardField} from '../../../contexts/card';
import visa from '../../../assets/brands/visa.png';
import amex from '../../../assets/brands/amex.png';
import mastercard from '../../../assets/brands/mastercard.png';
import elo from '../../../assets/brands/elo.png';
import hipercard from '../../../assets/brands/hipercard.png';
import nfc from '../../../assets/nfc.png';
import {CardBrand} from '../../../utils/cardBrands';
import {useSharedValue, withTiming} from 'react-native-reanimated';

interface CardFront {
  cardNumber?: number;
  cardExpiration?: string;
  cardHolder?: string;
  selectedField?: CardField | null;
  cardBrand: CardBrand;
  hasNfc: boolean;
}

export const CardFront = ({
  cardNumber,
  cardExpiration,
  cardHolder,
  selectedField,
  cardBrand,
  hasNfc,
}: CardFront) => {
  const fontBold = useFont(RobotoBold, 16);

  const chip = useImage(chipIcon);
  const visaLogo = useImage(visa);
  const amexLogo = useImage(amex);
  const mastercardLogo = useImage(mastercard);
  const hipercardLogo = useImage(hipercard);
  const eloLogo = useImage(elo);
  const nfcLogo = useImage(nfc);

  const logoOpacity = useValue(0);
  const nfcOpacity = useValue(0);

  const width = 85.6 * 4;

  const logoOpacityReanimated = useSharedValue(0);
  const nfcOpacityReanimated = useSharedValue(0);

  const cardData = {
    default: undefined,
    amex: amexLogo,
    visa: visaLogo,
    mastercard: mastercardLogo,
    nubank: mastercardLogo,
    elo: eloLogo,
    hipercard: hipercardLogo,
  };

  useEffect(() => {
    if (cardBrand === CardBrand.default) {
      logoOpacityReanimated.value = withTiming(0);
      return;
    }

    if (hasNfc) {
      nfcOpacityReanimated.value = withTiming(1, {
        duration: 300,
      });
    } else {
      nfcOpacityReanimated.value = withTiming(0);
    }

    logoOpacityReanimated.value = withTiming(1, {
      duration: 300,
    });
  }, [cardBrand, logoOpacityReanimated]);

  useSharedValueEffect(
    () => {
      logoOpacity.current = logoOpacityReanimated.value;
      nfcOpacity.current = nfcOpacityReanimated.value;
    },
    logoOpacityReanimated,
    nfcOpacityReanimated,
  );

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
      <Image image={chip!} x={20} y={40} width={50} height={50} />
      <Image
        image={nfcLogo!}
        x={80}
        y={52}
        height={25}
        width={25}
        opacity={nfcOpacity}
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
      {cardData[cardBrand] && (
        <Image
          image={cardData[cardBrand]!}
          x={width - 100}
          y={0}
          width={80}
          height={80}
          opacity={logoOpacity}
        />
      )}
      {selectedField === CardField.holder && (
        <Rect height={2} width={200} color="#fff" x={80} y={180} />
      )}
    </Group>
  );
};
