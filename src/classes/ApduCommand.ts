import {hexStringToByte, toHexString} from '../hooks/useReadCard';

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
      return [
        this.class_,
        this.instruction,
        this.p1,
        this.p2,
        this.data.length,
        ...this.data,
        0x00,
      ];
    }

    return [this.class_, this.instruction, this.p1, this.p2, 0x00];
  }

  public toString(): string {
    return '>>> ' + toHexString(this.getForTransceive());
  }

  static getPPSE(): ApduCommand {
    return this.getApplication([
      0x32, 0x50, 0x41, 0x59, 0x2e, 0x53, 0x59, 0x53, 0x2e, 0x44, 0x44, 0x46,
      0x30, 0x31,
    ]);
  }

  static getApplication(aid: number[]): ApduCommand {
    return new ApduCommand(0x00, 0xa4, 0x04, 0x00, aid);
  }

  static getProcessingOptions(pdolValue: number[]): ApduCommand {
    return new ApduCommand(0x80, 0xa8, 0x00, 0x00, pdolValue);
  }

  static readRecord(sfi: number, record: number): ApduCommand {
    return new ApduCommand(0x00, 0xb2, record, sfi + 4);
  }
}
