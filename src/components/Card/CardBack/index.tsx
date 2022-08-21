import React from "react";
import {
  Group,
  Rect,
  RoundedRect,
  Text,
  useFont,
} from "@shopify/react-native-skia";
import RobotoBold from "../../../assets/Roboto-Bold.ttf";
import { Dimensions } from "react-native";

interface CardBackProps {
  securityCode?: number;
}

export const CardBack = ({ securityCode }: CardBackProps) => {
  const width = Dimensions.get("window").width - 36;

  const fontBold = useFont(RobotoBold, 16);

  if (!fontBold) return <></>;

  return (
    <Group>
      <Rect x={0} y={16} width={width} height={60} color="#000" />
      <RoundedRect x={16} y={90} width={170} height={25} color="#fff" r={2} />
      <Text
        x={150}
        y={108}
        text={securityCode ? String(securityCode) : "100"}
        font={fontBold}
        color="#000"
      />
    </Group>
  );
};
