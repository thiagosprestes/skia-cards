global.Buffer = global.Buffer || require('buffer').Buffer;

import {useContext} from 'react';
import nfcManager from 'react-native-nfc-manager';
import {ApduResponse} from '../classes/ApduResponse';
import {ApduCommand} from '../classes/ApduCommand';
import {CardContext, CardContextProps, CardField} from '../contexts/card';
import terminalTag from '../utils/terminalTag.json';
import {MaskService} from 'react-native-masked-text';

export function hexStringToByte(str: string): number[] {
  if (!str) {
    return [];
  }

  var a: number[] = [];

  for (var i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.slice(i, i + 2), 16));
  }
  return a;
}

export function toHexString(value: number[]) {
  return Array.from(value, function (byte) {
    // eslint-disable-next-line no-bitwise
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
}

export const useReadCard = () => {
  const {setCardFieldValue, setCardHasNfc} = useContext(
    CardContext,
  ) as CardContextProps;

  const cardTransceive = async (
    command: ApduCommand,
  ): Promise<ApduResponse> => {
    console.log(`${command}`);
    const response = new ApduResponse(
      await nfcManager.isoDepHandler.transceive(command.getForTransceive()),
    );
    console.log(`${response}`);
    return response;
  };

  const getCardData = async () => {
    const getPpseApduResponse = await cardTransceive(ApduCommand.getPPSE());

    let ppseData = getPpseApduResponse.getAsTlv();

    const aid = ppseData.findAll('4F')[0].getValue();

    const getAppApduResponse = await cardTransceive(
      ApduCommand.getApplication(hexStringToByte(aid)),
    );

    const appData = getAppApduResponse.getAsTlv();
    const pdol = appData.find('9f38');

    let pdolValue: number[] = [];

    if (pdol) {
      for (const tag of pdol.parseDolValue().getList()) {
        pdolValue.push(...hexStringToByte(terminalTag[tag.tag]));
      }
      pdolValue = [0x83, pdolValue.length, ...pdolValue];
    } else {
      pdolValue = [0x83, 0x00];
    }

    const getGpoApduResponse = await cardTransceive(
      ApduCommand.getProcessingOptions(pdolValue),
    );

    const gpo = getGpoApduResponse.getAsTlv();

    const afl = gpo.find('94').getValue();

    let cardNumber = null;
    let cardExpiration = null;

    for (let index = 0; index < afl.length; index += 8) {
      const sfi = afl.slice(index, index + 2);
      const record1 = afl.slice(index + 2, index + 4);
      const record2 = afl.slice(index + 4, index + 6);

      for (
        let record = hexStringToByte(record1)[0];
        record <= hexStringToByte(record2)[0];
        record++
      ) {
        if (cardNumber && cardExpiration) {
          return;
        }
        const getReadRecordApduResponse = await cardTransceive(
          ApduCommand.readRecord(hexStringToByte(sfi)[0], record),
        );

        const recordData = getReadRecordApduResponse.getAsTlv();

        cardNumber = recordData.find('5A');
        cardExpiration = recordData.find('5F24');

        if (cardNumber) {
          console.log(cardNumber.getValue());

          const applyMask = MaskService.toMask(
            'credit-card',
            cardNumber.getValue(),
          );

          setCardFieldValue({
            field: CardField.number,
            value: applyMask,
          });

          setCardHasNfc(true);
        }

        if (cardExpiration) {
          console.log(cardExpiration.getValue());

          const expiration = cardExpiration.getValue();

          const expirationYear = expiration.substring(0, 2);
          const expirationMonth = expiration.substring(2, 4);

          setCardFieldValue({
            field: CardField.expiration,
            value: `${expirationMonth}/${expirationYear}`,
          });
        }
      }
    }
  };

  return {getCardData};
};
