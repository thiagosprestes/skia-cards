import {toHexString} from '../hooks/useReadCard';

export class DOL {
  public requiredTags: Record<string, number> = {};

  constructor(fullDol: number[]) {
    let remainingData = fullDol;

    while (remainingData) {
      let returnable: {
        TAG?: number[];
        LENGTH?: number[];
        REMAINING: number[];
      } = this.getTag(remainingData);

      remainingData = returnable.REMAINING;

      var tag = returnable.TAG;

      returnable = this.getLength(remainingData);

      remainingData = returnable.REMAINING!!;

      const length = returnable.LENGTH;

      const hexTag = toHexString(tag!);

      this.requiredTags[hexTag.replace(' ', '')] = length![0];
    }
  }

  getTag(fullData: number[]) {
    var tagBytes: number[] = [];
    var nextByteCounter = 0;
    let remaining: number[] = [];

    let firstTagByte = fullData[nextByteCounter++];

    tagBytes.push(firstTagByte);

    if (this.matchMask(firstTagByte, 0b11111)) {
      var newByte = fullData[nextByteCounter++];
      tagBytes.push(newByte);

      while (this.matchMask(newByte, 0b10000000)) {
        newByte = fullData[nextByteCounter++];
        tagBytes.push(newByte);
      }
    }

    remaining = fullData.slice(nextByteCounter);

    return {TAG: tagBytes, REMAINING: remaining};
  }

  getLength(fullData: number[]) {
    var nextByteCounter = 0;
    var lenBytes: number[] = [];

    lenBytes.push(fullData[nextByteCounter++]);

    var remaining: number[] = [];

    remaining = fullData.slice(nextByteCounter);

    return {LENGTH: lenBytes, REMAINING: remaining};
  }

  matchMask(byte: number, mask: number): boolean {
    return (byte & mask) === mask;
  }
}
