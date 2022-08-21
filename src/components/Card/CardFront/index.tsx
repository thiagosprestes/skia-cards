import React from "react";
import { Group, Text, useFont } from "@shopify/react-native-skia";
import RobotoBold from "../../../assets/Roboto-Bold.ttf";

interface CardFront {
  cardNumber?: number;
  cardExpiration?: string;
  cardHolder?: string;
}

export const CardFront = ({
  cardNumber,
  cardExpiration,
  cardHolder,
}: CardFront) => {
  const height = 200;

  const fontBold = useFont(RobotoBold, 16);

  if (!fontBold) return <></>;

  return (
    <Group>
      <Text
        x={20}
        y={height / 2 + 25}
        text={cardNumber ? String(cardNumber) : "XXXX XXXX XXXX XXXX XXXX"}
        font={fontBold}
        color="#fff"
      />
      <Text
        x={20}
        y={height - 25}
        text={cardExpiration ?? "00/00"}
        font={fontBold}
        color="#fff"
      />
      <Text
        x={80}
        y={height - 25}
        text={cardHolder ?? "NOME"}
        font={fontBold}
        color="#fff"
      />
    </Group>
  );
};
