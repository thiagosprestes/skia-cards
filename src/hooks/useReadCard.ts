global.Buffer = global.Buffer || require('buffer').Buffer;

import TLV from 'node-tlv';
import {useContext} from 'react';
import nfcManager from 'react-native-nfc-manager';
import {ApduResponse} from '../classes/ApdeuResponse';
import {ApduCommand} from '../classes/ApduCommand';
import {CardContext, CardContextProps, CardField} from '../contexts/card';

function hexStringToByte(str: string): number[] {
  if (!str) {
    return [];
  }

  var a: number[] = [];

  for (var i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }
  return a;
}

function toHexString(value: number[]) {
  return Array.from(value, function (byte) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
}

export const useReadCard = () => {
  const {setCardFieldValue} = useContext(CardContext) as CardContextProps;

  const getCardData = async () => {
    const getPpseApduCommand = new ApduCommand(
      0x00,
      0xa4,
      0x04,
      0x00,
      [
        0x32, 0x50, 0x41, 0x59, 0x2e, 0x53, 0x59, 0x53, 0x2e, 0x44, 0x44, 0x46,
        0x30, 0x31,
      ],
    );

    const getPpseApduResponse = new ApduResponse(
      await nfcManager.isoDepHandler.transceive(
        getPpseApduCommand.getForTransceive(),
      ),
    );

    const tlv = TLV.parse(toHexString(getPpseApduResponse.data));

    const aid = tlv.find('A5').find('bF0C').getChild()[0].find('4F').getValue();

    const getAppApduCommand = new ApduCommand(
      0x00,
      0xa4,
      0x04,
      0x00,
      hexStringToByte(aid),
    );

    const getAppApduResponse = new ApduResponse(
      await nfcManager.isoDepHandler.transceive(
        getAppApduCommand.getForTransceive(),
      ),
    );

    console.log(toHexString(getAppApduResponse.data));

    const getGpoApduCommand = new ApduCommand(
      0x80,
      0xa8,
      0x00,
      0x00,
      [0x83, 0x00],
    );

    const getGpoApduResponse = new ApduResponse(
      await nfcManager.isoDepHandler.transceive(
        getGpoApduCommand.getForTransceive(),
      ),
    );

    const gpo = TLV.parse(toHexString(getGpoApduResponse.data));

    const afl = gpo.find('94').getValue();

    for (let index = 0; index < afl.length; index += 8) {
      const sfi = afl.slice(index, index + 2);
      const record1 = afl.slice(index + 2, index + 4);
      const record2 = afl.slice(index + 4, index + 6);

      for (
        let record = hexStringToByte(record1)[0];
        record <= hexStringToByte(record2)[0];
        record++
      ) {
        const getReadRecordApduCommand = new ApduCommand(
          0x00,
          0xb2,
          record,
          hexStringToByte(sfi)[0] + 4,
        );

        const getReadRecordApduResponse = new ApduResponse(
          await nfcManager.isoDepHandler.transceive(
            getReadRecordApduCommand.getForTransceive(),
          ),
        );

        const recordResponse = TLV.parse(
          toHexString(getReadRecordApduResponse.data),
        );

        const cardNumber = recordResponse.find('5A');
        const cardExpiration = recordResponse.find('5F24');

        if (cardNumber) {
          console.log(cardNumber.getValue());
          setCardFieldValue({
            field: CardField.number,
            value: cardNumber.getValue(),
          });
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
