import {useContext, useEffect, useState} from 'react';
import nfcManager, {NfcAdapter, NfcTech} from 'react-native-nfc-manager';
import {CardContext, CardContextProps} from '../contexts/card';
import {useReadCard} from './useReadCard';

export enum ReadCard {
  loading = 'loading',
  default = 'default',
  error = 'error',
}

interface HookReturn {
  hasNfc: boolean;
  isNfcEnabled: boolean;
  verifyNfc(): Promise<void>;
  onReadNfc(): Promise<void>;
  isLoadingNfcInfo: boolean;
  readCardState: ReadCard;
  onRetryCardRead(): void;
}

export const useNfc = (): HookReturn => {
  const [isLoadingNfcInfo, setIsLoadingNfcInfo] = useState(true);
  const [readCardState, setReadCardState] = useState(ReadCard.default);
  const [hasNfc, setHasNfc] = useState(false);
  const [isNfcEnabled, setIsNfcEnabled] = useState(false);

  nfcManager.start();

  const {getCardData} = useReadCard();

  const {onGoToForm} = useContext(CardContext) as CardContextProps;

  const verifyNfc = async () => {
    setHasNfc(await nfcManager.isSupported());
    setIsNfcEnabled(await nfcManager.isEnabled());

    setIsLoadingNfcInfo(false);
  };

  const onReadNfc = async () => {
    try {
      await nfcManager.requestTechnology(NfcTech.IsoDep, {
        isReaderModeEnabled: true,
        readerModeDelay: 1000,
        invalidateAfterFirstRead: true,
        readerModeFlags:
          NfcAdapter.FLAG_READER_NFC_A + NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK,
      });

      const tag = await nfcManager.getTag();

      setReadCardState(ReadCard.loading);

      await getCardData();

      onGoToForm();

      console.log('Tag found', tag);

      setReadCardState(ReadCard.default);
    } catch (ex) {
      console.log('Oops!', ex);

      setReadCardState(ReadCard.error);
    } finally {
      nfcManager.cancelTechnologyRequest();
    }
  };

  const onRetryCardRead = () => {
    setReadCardState(ReadCard.default);
    onReadNfc();
  };

  return {
    hasNfc,
    isNfcEnabled,
    verifyNfc,
    onReadNfc,
    isLoadingNfcInfo,
    readCardState,
    onRetryCardRead,
  };
};
