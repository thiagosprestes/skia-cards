export enum CardBrand {
  default = 'default',
  amex = 'amex',
  mastercard = 'mastercard',
  nubank = 'nubank',
  visa = 'visa',
  elo = 'elo',
  hipercard = 'hipercard',
}

interface CardBrandRegex {
  [key: string]: RegExp;
}

export const cardBrandsRegex: CardBrandRegex = {
  visa: /^4[0-9]{12}(?:[0-9]{3})/,
  nubank: /^(516220|516230|516292|523421|537678|550209|554865){14}/,
  mastercard: /^5[1-5][0-9]{14}/,
  amex: /^3[47][0-9]{13}/,
  hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
  elo: /^(4011|431274|438935|451416|457393|4576|457631|457632|504175|50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|627780|636297|636368|636369|(6503[1-3])|(6500(3[5-9]|4[0-9]|5[0-1]))|(6504(0[5-9]|1[0-9]|2[0-9]|3[0-9]))|(650(48[5-9]|49[0-9]|50[0-9]|51[1-9]|52[0-9]|53[0-7]))|(6505(4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-8]))|(6507(0[0-9]|1[0-8]))|(6507(2[0-7]))|(650(90[1-9]|91[0-9]|920))|(6516(5[2-9]|6[0-9]|7[0-9]))|(6550(0[0-9]|1[1-9]))|(6550(2[1-9]|3[0-9]|4[0-9]|5[0-8]))|(506(699|77[0-8]|7[1-6][0-9))|(509([0-9][0-9][0-9])))/,
};

export const cardBrandsColors = {
  visa: ['#122D96', '#1A1E5D'],
  mastercard: ['#F7A02D', '#F58627'],
  nubank: ['#9336BE', '#6D0B8A'],
  amex: ['#86D8B5', '#449E79'],
  hipercard: ['#C21D22', '#9A171B'],
  elo: ['#88847E', '#38322E'],
  default: ['#3e4141', '#202323'],
};

export const getCardBrand = (cardNumber: number): CardBrand | undefined => {
  const getCardNumbersOnly = String(cardNumber).replace(/[^0-9]+/g, '');

  for (const cardBrand in cardBrandsRegex) {
    if (cardBrandsRegex[cardBrand].test(getCardNumbersOnly)) {
      return cardBrand as CardBrand;
    }
  }
};
