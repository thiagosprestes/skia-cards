export class ApduResponse {
  status: number[];
  data: number[];

  constructor(arr: number[]) {
    this.status = arr.slice(-2);
    this.data = arr.slice(0, -2);
  }
}
