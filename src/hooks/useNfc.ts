import {useContext, useEffect, useState} from 'react';
import nfcManager, {NfcAdapter, NfcTech} from 'react-native-nfc-manager';
import Snackbar from 'react-native-snackbar';
import {CardContext, CardContextProps} from '../contexts/card';
import {useReadCard} from './useReadCard';

interface HookReturn {
  hasNfc: boolean;
  isNfcEnabled: boolean;
  verifyNfc(): Promise<void>;
  onReadNfc(): Promise<void>;
  isLoadingNfcInfo: boolean;
  isLoadingCardData: boolean;
}

export const useNfc = (): HookReturn => {
  const [isLoadingNfcInfo, setIsLoadingNfcInfo] = useState(true);
  const [isLoadingCardData, setIsCardData] = useState(false);
  const [hasNfc, setHasNfc] = useState(false);
  const [isNfcEnabled, setIsNfcEnabled] = useState(false);

  const {getCardData} = useReadCard();

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

      setIsCardData(true);

      await getCardData();

      console.log('Tag found', tag);

      setIsCardData(false);
    } catch (ex) {
      console.log('Oops!', ex);

      Snackbar.show({
        text: 'Não foi possível ler os dados do cartão. Tente novamente',
        duration: Snackbar.LENGTH_LONG,
      });
    } finally {
      nfcManager.cancelTechnologyRequest();
      setIsCardData(false);
    }
  };

  return {
    hasNfc,
    isNfcEnabled,
    verifyNfc,
    onReadNfc,
    isLoadingNfcInfo,
    isLoadingCardData,
  };
};
