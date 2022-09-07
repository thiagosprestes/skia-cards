import React, {useContext, useEffect, useState} from 'react';
import {useAnimatedStyle} from 'react-native-reanimated';
import nfcManager from 'react-native-nfc-manager';
import Snackbar from 'react-native-snackbar';
import {Home, InsertNumber, State} from './Home/ui';
import {CardContext, CardContextProps} from '../contexts/card';
import {useNfc} from '../hooks/useNfc';
import {useRotateCard} from '../hooks/useRotateCard';
import {CardBrand, getCardBrand} from '../utils/cardBrands';

export const HomeScreen = () => {
  const [state, setState] = useState(State.loading);

  const [cardBrand, setCardBrand] = useState(CardBrand.default);

  const {card, cardFrontPosition, cardBackPosition, flipCard, selectedField} =
    useContext(CardContext) as CardContextProps;

  const {hasNfc, verifyNfc, isLoadingNfcInfo} = useNfc();

  const [insertNumberType, setInsertNumberType] = useState<InsertNumber>();

  const {number, expiration, holder, securityCode} = card;

  const onSelectNfc = async () => {
    const isNfcEnabled = await nfcManager.isEnabled();

    if (!isNfcEnabled) {
      Snackbar.show({
        text: 'Habilite o NFC para continuar',
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }

    setInsertNumberType(InsertNumber.nfc);
  };

  const onChangeInsertNumberType = (type?: InsertNumber) => {
    setInsertNumberType(type ?? undefined);
  };

  useEffect(() => {
    const brand = getCardBrand(number!);

    if (brand) {
      setCardBrand(CardBrand[brand]);
      return;
    }

    setCardBrand(CardBrand.default);
  }, [number]);

  useEffect(() => {
    verifyNfc();
  }, [verifyNfc]);

  useEffect(() => {
    if (!isLoadingNfcInfo) {
      setState(State.default);

      if (!hasNfc) {
        setInsertNumberType(InsertNumber.manual);
      }
    }
  }, [hasNfc, isLoadingNfcInfo]);

  return (
    <Home
      cardBackPosition={cardBackPosition}
      cardBrand={cardBrand}
      cardFrontPosition={cardFrontPosition}
      expiration={expiration}
      flipCard={flipCard}
      holder={holder}
      insertNumberType={insertNumberType}
      number={number}
      onChangeInsertNumberType={onChangeInsertNumberType}
      onSelectNfc={onSelectNfc}
      securityCode={securityCode}
      state={state}
      selectedField={selectedField}
    />
  );
};
