import React, {useContext, useEffect, useState} from 'react';
import nfcManager from 'react-native-nfc-manager';
import Snackbar from 'react-native-snackbar';
import {Home, InsertNumber, State} from './Home/ui';
import {CardContext, CardContextProps} from '../contexts/card';
import {useNfc} from '../hooks/useNfc';
import {CardBrand, getCardBrand} from '../utils/cardBrands';

export const HomeScreen = () => {
  const [state, setState] = useState(State.loading);

  const [cardBrand, setCardBrand] = useState(CardBrand.default);

  const {
    card,
    cardFrontPosition,
    cardBackPosition,
    flipCard,
    selectedField,
    onGoToReadCard,
    onGoToForm,
    insertNumberType,
    onResetSelectedInsertNumberType,
  } = useContext(CardContext) as CardContextProps;

  const {hasNfc, verifyNfc, isLoadingNfcInfo} = useNfc();

  const {number, expiration, holder, securityCode, hasNfc: cardHasNfc} = card;

  const onSelectNfc = async () => {
    const isNfcEnabled = await nfcManager.isEnabled();

    if (!isNfcEnabled) {
      Snackbar.show({
        text: 'Habilite o NFC para continuar',
        duration: Snackbar.LENGTH_LONG,
      });
      return;
    }

    onGoToReadCard();
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
        onGoToForm();
      }
    }
  }, [hasNfc, isLoadingNfcInfo, onGoToForm]);

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
      onSelectNfc={onSelectNfc}
      securityCode={securityCode}
      state={state}
      selectedField={selectedField}
      onResetSelectedInsertNumberType={onResetSelectedInsertNumberType}
      onGoToForm={onGoToForm}
      hasNfc={cardHasNfc}
    />
  );
};
