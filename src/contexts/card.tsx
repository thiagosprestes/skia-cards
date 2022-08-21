import React, { createContext, ReactElement, useState } from "react";
import { CardStep } from "../components/CardSteps/Step";

interface Card {
  number?: number;
  expiration?: string;
  holder?: string;
  securityCode?: number;
}

interface SetValueProps {
  step: CardStep;
  value: string;
}

export interface CardContextProps extends Card {
  setValue({ step, value }: SetValueProps): void;
  clearCardData(): void;
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

  const setValue = ({ step, value }: SetValueProps) =>
    setCard((oldState) => ({ ...oldState, [step]: value }));

  const clearCardData = () => setCard(cardInitialState);

  const { number, expiration, holder, securityCode } = card;

  return (
    <CardContext.Provider
      value={{
        number,
        expiration,
        holder,
        securityCode,
        setValue,
        clearCardData,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
