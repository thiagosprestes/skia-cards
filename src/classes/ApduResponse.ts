import TLV from 'node-tlv';
import {toHexString} from '../hooks/useReadCard';

export class ApduResponse {
  status: number[];
  data: number[];

  constructor(arr: number[]) {
    this.status = arr.slice(-2);
    this.data = arr.slice(0, -2);
  }

  toString(): string {
    return (
      '<<< ' + toHexString(this.data), '[' + toHexString(this.status) + ']'
    );
  }

  getAsTlv(): TLV {
    return TLV.parse(toHexString(this.data));
  }
}
