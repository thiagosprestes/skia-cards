import React from "react";
import {
  Canvas,
  Image,
  LinearGradient,
  RoundedRect,
  useImage,
  vec,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";

export enum CardBrand {
  DEFAULT = "default",
  AMEX = "amex",
  MASTERCARD = "mastercard",
  VISA = "visa",
  ELO = "elo",
  HIPERCARD = "hipercard",
}

interface CardProps {
  children: React.ReactElement;
  cardBrand: CardBrand;
}

export const Card = ({ children, cardBrand }: CardProps) => {
  const visaLogo = useImage(require("../../assets/brands/visa.png"));
  const amexLogo = useImage(require("../../assets/brands/amex.png"));
  const mastercardLogo = useImage(
    require("../../assets/brands/mastercard.png")
  );
  const eloLogo = useImage(require("../../assets/brands/elo.png"));
  const hipercardLogo = useImage(require("../../assets/brands/hipercard.png"));

  const width = Dimensions.get("window").width - 36;
  const height = 200;

  const cardData = {
    amex: { colors: ["#86D8B5", "#449E79"], logo: amexLogo },
    visa: { colors: ["#122D96", "#1A1E5D"], logo: visaLogo },
    mastercard: { colors: ["#F7A02D", "#F58627"], logo: mastercardLogo },
    elo: { colors: ["#88847E", "#38322E"], logo: eloLogo },
    hipercard: { colors: ["#C21D22", "#9A171B"], logo: hipercardLogo },
    default: { colors: ["#3e4141", "#202323"], logo: undefined },
  };

  return (
    <>
      <Canvas style={{ height, width }}>
        <RoundedRect x={0} y={0} width={width} height={height} r={10}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(256, 256)}
            colors={cardData[cardBrand].colors}
          />
        </RoundedRect>
        {cardData[cardBrand].logo && (
          <Image
            image={cardData[cardBrand].logo!}
            x={width - 120}
            y={0}
            width={100}
            height={100}
          />
        )}
        {children}
      </Canvas>
    </>
  );
};
