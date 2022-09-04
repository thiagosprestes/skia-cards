import React, {createContext, ReactElement, useState} from 'react';
import {
  Easing,
  SharedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export enum CardPosition {
  FRONT = 'front',
  BACK = 'back',
}

export enum CardField {
  number = 'number',
  expiration = 'expiration',
  holder = 'holder',
  securityCode = 'securityCode',
}

interface Card {
  number?: number;
  expiration?: string;
  holder?: string;
  securityCode?: number;
}

interface setCardFieldValueProps {
  field: CardField;
  value: string;
}

export interface CardContextProps {
  setCardFieldValue({field, value}: setCardFieldValueProps): void;
  clearCardData(): void;
  selectedField: CardField | undefined | null;
  cardPosition: CardPosition;
  card: Card;
  cardFrontPosition: SharedValue<string>;
  cardBackPosition: SharedValue<string>;
  flipCardToFront(): void;
  flipCardToBack(): void;
  flipCard(): void;
  selectField(field: CardField): void;
}

interface CardProps {
  children: ReactElement;
}

export const CardContext = createContext<CardContextProps | undefined>(
  undefined,
);

export const CardProvider = ({children}: CardProps) => {
  const cardInitialState = {
    number: undefined,
    expiration: undefined,
    holder: undefined,
    securityCode: undefined,
  };

  const [card, setCard] = useState<Card>(cardInitialState);
  const [selectedField, setSelectedField] = useState<CardField | null>();
  const [cardPosition, setCardPosition] = useState(CardPosition.FRONT);

  const cardFrontPosition = useSharedValue('0deg');
  const cardBackPosition = useSharedValue('90deg');

  const flipCardToFront = () => {
    setCardPosition(CardPosition.FRONT);

    cardBackPosition.value = withTiming(
      '90deg',
      {
        duration: 200,
        easing: Easing.linear,
      },
      () => {
        cardFrontPosition.value = withTiming('0deg', {
          duration: 200,
          easing: Easing.linear,
        });
      },
    );
  };

  const flipCardToBack = () => {
    setCardPosition(CardPosition.BACK);

    cardFrontPosition.value = withTiming(
      '90deg',
      {
        duration: 200,
        easing: Easing.linear,
      },
      () => {
        cardBackPosition.value = withTiming('180deg', {
          duration: 200,
          easing: Easing.linear,
        });
      },
    );
  };

  const flipCard = () => {
    if (cardFrontPosition.value === '90deg') {
      flipCardToFront();
      return;
    }

    flipCardToBack();
  };

  const setCardFieldValue = ({field, value}: setCardFieldValueProps) => {
    setCard(oldState => ({
      ...oldState,
      [field]: value,
    }));
  };

  const clearCardData = () => {
    if (cardPosition === CardPosition.BACK) {
      flipCardToFront();
    }

    setCard(cardInitialState);
    setSelectedField(CardField.number);
  };

  const selectField = (field: CardField) => {
    setSelectedField(field);

    if (
      field === CardField.securityCode &&
      cardPosition === CardPosition.FRONT
    ) {
      flipCardToBack();
      return;
    }

    if (
      field !== CardField.securityCode &&
      cardPosition === CardPosition.BACK
    ) {
      flipCardToFront();
    }
  };

  return (
    <CardContext.Provider
      value={{
        setCardFieldValue,
        clearCardData,
        selectedField,
        card,
        cardPosition,
        cardFrontPosition,
        cardBackPosition,
        flipCardToFront,
        flipCardToBack,
        flipCard,
        selectField,
      }}>
      {children}
    </CardContext.Provider>
  );
};
