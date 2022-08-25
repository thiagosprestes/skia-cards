export enum CardBrand {
  default = "default",
  amex = "amex",
  mastercard = "mastercard",
  visa = "visa",
  elo = "elo",
  hipercard = "hipercard",
}

interface CardBrandRegex {
  [key: string]: RegExp;
}

export const cardBrandsRegex: CardBrandRegex = {
  visa: /^4[0-9]{12}(?:[0-9]{3})/,
  mastercard: /^5[1-5][0-9]{14}/,
  amex: /^3[47][0-9]{13}/,
  hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
  elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
};

export const cardBrandsColors = {
  visa: ["#122D96", "#1A1E5D"],
  mastercard: ["#F7A02D", "#F58627"],
  amex: ["#86D8B5", "#449E79"],
  hipercard: ["#C21D22", "#9A171B"],
  elo: ["#88847E", "#38322E"],
  default: ["#3e4141", "#202323"],
};

export const getCardBrand = (cardNumber: number): CardBrand | undefined => {
  const getCardNumbersOnly = String(cardNumber).replace(/[^0-9]+/g, "");

  for (const cardBrand in cardBrandsRegex) {
    if (cardBrandsRegex[cardBrand].test(getCardNumbersOnly))
      return cardBrand as CardBrand;
  }
};
