import React, { createContext, ReactElement, useState } from "react";
import {
  Easing,
  SharedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export enum CardPosition {
  FRONT = "front",
  BACK = "back",
}

export enum CardStep {
  number = "number",
  expiration = "expiration",
  holder = "holder",
  securityCode = "securityCode",
}

interface Card {
  number?: number;
  expiration?: string;
  holder?: string;
  securityCode?: number;
}

interface setCardFieldValueProps {
  step: CardStep;
  value: string;
}

export interface CardContextProps {
  setCardFieldValue({ step, value }: setCardFieldValueProps): void;
  clearCardData(): void;
  step: CardStep;
  changeStep(step: CardStep): void;
  cardPosition: CardPosition;
  card: Card;
  cardFrontPosition: SharedValue<string>;
  cardBackPosition: SharedValue<string>;
  flipCardToFront(): void;
  flipCardToBack(): void;
  flipCard(): void;
}

interface CardProps {
  children: ReactElement;
}

export const CardContext = createContext<CardContextProps | undefined>(
  undefined
);

export const CardProvider = ({ children }: CardProps) => {
  const cardInitialState = {
    number: undefined,
    expiration: undefined,
    holder: undefined,
    securityCode: undefined,
  };

  const [card, setCard] = useState<Card>(cardInitialState);
  const [step, setStep] = useState(CardStep.number);
  const [cardPosition, setCardPosition] = useState(CardPosition.FRONT);

  const cardFrontPosition = useSharedValue("0deg");
  const cardBackPosition = useSharedValue("90deg");

  const flipCardToFront = () => {
    setCardPosition(CardPosition.FRONT);

    cardBackPosition.value = withTiming(
      "90deg",
      {
        duration: 200,
        easing: Easing.linear,
      },
      () => {
        cardFrontPosition.value = withTiming("0deg", {
          duration: 200,
          easing: Easing.linear,
        });
      }
    );
  };

  const flipCardToBack = () => {
    setCardPosition(CardPosition.BACK);

    cardFrontPosition.value = withTiming(
      "90deg",
      {
        duration: 200,
        easing: Easing.linear,
      },
      () => {
        cardBackPosition.value = withTiming("180deg", {
          duration: 200,
          easing: Easing.linear,
        });
      }
    );
  };

  const flipCard = () => {
    if (cardFrontPosition.value === "90deg") {
      flipCardToFront();
      return;
    }

    flipCardToBack();
  };

  const setCardFieldValue = ({ step, value }: setCardFieldValueProps) => {
    setCard((oldState) => ({
      ...oldState,
      [step]: value,
    }));

    if (step === CardStep.securityCode) {
      flipCardToBack();
      return;
    }

    flipCardToFront();
  };

  const clearCardData = () => {
    flipCardToFront();
    setCard(cardInitialState);
    setStep(CardStep.number);
  };

  const changeStep = (step: CardStep) => {
    if (step === CardStep.securityCode) flipCardToBack();

    setStep(step);
  };

  return (
    <CardContext.Provider
      value={{
        setCardFieldValue,
        clearCardData,
        step,
        changeStep,
        card,
        cardPosition,
        cardFrontPosition,
        cardBackPosition,
        flipCardToFront,
        flipCardToBack,
        flipCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
