import {toHexString} from '../hooks/useReadCard';

export class ApduResponse {
  status: number[];
  data: number[];

  constructor(arr: number[]) {
    this.status = arr.slice(-2);
    this.data = arr.slice(0, -2);
    console.log(
      '🚀 ~ file: ApdeuResponse.ts ~ line 10 ~ ApduResponse ~ constructor ~ arr',
      arr,
    );
    console.log(toHexString(this.data), toHexString(this.status));
  }
}
