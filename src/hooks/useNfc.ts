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
      // register for the NFC tag with NDEF in it
      await nfcManager.requestTechnology(NfcTech.IsoDep, {
        isReaderModeEnabled: true,
        readerModeDelay: 10,
        // invalidateAfterFirstRead: true,
        readerModeFlags:
          NfcAdapter.FLAG_READER_NFC_A + NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK,
      });
      // the resolved tag object will contain `ndefMessage` property
      const tag = await nfcManager.getTag();

      await getCardData();

      console.log('Tag found', tag);

      // nfcManager.cancelTechnologyRequest();

      toggleNfcRead();
    } catch (ex) {
      console.log('Oops!', ex);
    }
  };

  return {hasNfc, isNfcEnabled, verifyNfc, onReadNfc};
};
