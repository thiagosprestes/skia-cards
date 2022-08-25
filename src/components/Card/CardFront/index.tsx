import React from "react";
import { Group, Rect, Text, useFont } from "@shopify/react-native-skia";
import RobotoBold from "../../../assets/Roboto-Bold.ttf";
import { CardStep } from "../../CardSteps/Step";

interface CardFront {
  cardNumber?: number;
  cardExpiration?: string;
  cardHolder?: string;
  step: CardStep;
}

export const CardFront = ({
  cardNumber,
  cardExpiration,
  cardHolder,
  step,
}: CardFront) => {
  const fontBold = useFont(RobotoBold, 16);

  if (!fontBold) return <></>;

  return (
    <Group>
      <Text
        x={20}
        y={125}
        text={cardNumber ? String(cardNumber) : "XXXX XXXX XXXX XXXX XXXX"}
        font={fontBold}
        color="#fff"
      />
      {step === CardStep.number && (
        <Rect height={2} width={220} color="#fff" x={20} y={130} />
      )}
      <Text
        x={20}
        y={175}
        text={cardExpiration ?? "00/00"}
        font={fontBold}
        color="#fff"
      />
      {step === CardStep.expiration && (
        <Rect height={2} width={45} color="#fff" x={20} y={180} />
      )}
      <Text
        x={80}
        y={175}
        text={cardHolder ?? "NOME"}
        font={fontBold}
        color="#fff"
      />
      {step === CardStep.holder && (
        <Rect height={2} width={200} color="#fff" x={80} y={180} />
      )}
    </Group>
  );
};
