import {useContext, useEffect, useState} from 'react';
import nfcManager, {NfcAdapter, NfcTech} from 'react-native-nfc-manager';
import {CardContext, CardContextProps} from '../contexts/card';
import {useReadCard} from './useReadCard';

interface HookReturn {
  hasNfc: boolean;
  isNfcEnabled: boolean;
  verifyNfc(): Promise<void>;
  onReadNfc(): Promise<void>;
}

export const useNfc = (): HookReturn => {
  const [hasNfc, setHasNfc] = useState(false);
  const [isNfcEnabled, setIsNfcEnabled] = useState(false);

  const {toggleNfcRead} = useContext(CardContext) as CardContextProps;

  const {getCardData} = useReadCard();

  const verifyNfc = async () => {
    setHasNfc(await nfcManager.isSupported());
    setIsNfcEnabled(await nfcManager.isEnabled());
  };

  const onReadNfc = async () => {
    try {
      await nfcManager.cancelTechnologyRequest();
      // register for the NFC tag with NDEF in it
      console.log('starting request');
      await nfcManager.requestTechnology(NfcTech.IsoDep, {
        isReaderModeEnabled: true,
        readerModeDelay: 1000,
        invalidateAfterFirstRead: true,
        readerModeFlags:
          NfcAdapter.FLAG_READER_NFC_A + NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK,
      });
      // the resolved tag object will contain `ndefMessage` property
      const tag = await nfcManager.getTag();

      await getCardData();

      console.log('Tag found', tag);
    } catch (ex) {
      console.log('Oops!', ex);
    }

    toggleNfcRead();
  };

  return {hasNfc, isNfcEnabled, verifyNfc, onReadNfc};
};
