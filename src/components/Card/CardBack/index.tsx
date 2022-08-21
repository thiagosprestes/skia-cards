import React from "react";
import { Group, Text, useFont } from "@shopify/react-native-skia";
import RobotoBold from "../../../assets/Roboto-Bold.ttf";

export const CardBack = () => {
  const height = 200;

  const fontBold = useFont(RobotoBold, 16);

  if (!fontBold) return <></>;

  return (
    <Group>
      <Text
        x={20}
        y={100}
        text="0000 0000 0000 0000 0000"
        font={fontBold}
        color="#fff"
      />
      <Text x={20} y={height - 25} text="08/30" font={fontBold} color="#fff" />
      <Text x={100} y={height - 25} text="888" font={fontBold} color="#fff" />
    </Group>
  );
};
