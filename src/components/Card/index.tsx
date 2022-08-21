import React from "react";
import { Text as RNText } from "react-native";
import {
  Canvas,
  LinearGradient,
  RoundedRect,
  Shadow,
  vec,
  Text,
  useFont,
  Group,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import RobotoBold from "../../assets/Roboto-Bold.ttf";

interface CardProps {
  children: React.ReactElement;
}

export const Card = ({ children }: CardProps) => {
  const width = Dimensions.get("window").width - 36;
  const height = 200;

  const fontBold = useFont(RobotoBold, 16);

  if (!fontBold) return <></>;

  return (
    <Canvas style={{ height, width }}>
      <RoundedRect
        x={0}
        y={0}
        width={width}
        height={height}
        r={16}
        color="#2d2d2d"
      >
        <LinearGradient
          start={vec(0, 0)}
          end={vec(256, 256)}
          colors={["#3e4141", "#262827", "#191a1a", "#202323"]}
        />
      </RoundedRect>
      {children}
    </Canvas>
  );
};
