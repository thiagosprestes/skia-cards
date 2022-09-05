import {toHexString} from '../hooks/useReadCard';

export class ApduCommand {
  private class_: number;
  private instruction: number;
  private p1: number;
  private p2: number;
  private data?: number[];

  constructor(
    class_: number,
    instruction: number,
    p1: number,
    p2: number,
    data?: number[],
  ) {
    this.class_ = class_;
    this.instruction = instruction;
    this.p1 = p1;
    this.p2 = p2;
    this.data = data;
  }

  getForTransceive(): number[] {
    if (this.data) {
      console.log(
        toHexString([
          this.class_,
          this.instruction,
          this.p1,
          this.p2,
          this.data.length,
          ...this.data,
        ]),
      );

      return [
        this.class_,
        this.instruction,
        this.p1,
        this.p2,
        this.data.length,
        ...this.data,
      ];
    }

    console.log(toHexString([this.class_, this.instruction, this.p1, this.p2]));

    return [this.class_, this.instruction, this.p1, this.p2];
  }
}
