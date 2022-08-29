import React, { useEffect } from "react";
import {
  Canvas,
  Image,
  LinearGradient,
  RoundedRect,
  useImage,
  useSharedValueEffect,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import visa from "../../assets/brands/visa.png";
import amex from "../../assets/brands/amex.png";
import mastercard from "../../assets/brands/mastercard.png";
import elo from "../../assets/brands/elo.png";
import hipercard from "../../assets/brands/hipercard.png";
import { CardBrand, cardBrandsColors } from "../../utils/cardBrands";
import { useSharedValue, withTiming } from "react-native-reanimated";

interface CardProps {
  children: React.ReactElement;
  cardBrand: CardBrand;
}

export const Card = ({ children, cardBrand }: CardProps) => {
  const width = Dimensions.get("window").width - 36;
  const height = 200;

  const visaLogo = useImage(visa);
  const amexLogo = useImage(amex);
  const mastercardLogo = useImage(mastercard);
  const hipercardLogo = useImage(hipercard);
  const eloLogo = useImage(elo);

  const cardData = {
    default: { colors: cardBrandsColors.default, logo: undefined },
    amex: { colors: cardBrandsColors.amex, logo: amexLogo },
    visa: { colors: cardBrandsColors.visa, logo: visaLogo },
    mastercard: { colors: cardBrandsColors.mastercard, logo: mastercardLogo },
    elo: { colors: cardBrandsColors.elo, logo: eloLogo },
    hipercard: { colors: cardBrandsColors.hipercard, logo: hipercardLogo },
  };

  const cardOpacity = useValue(0);
  const logoOpacity = useValue(0);

  const cardOpacityReanimated = useSharedValue(0);
  const logoOpacityReanimated = useSharedValue(0);

  useEffect(() => {
    if (cardBrand === CardBrand.default) {
      cardOpacityReanimated.value = withTiming(0);
      logoOpacityReanimated.value = withTiming(0);
      return;
    }

    logoOpacityReanimated.value = withTiming(
      1,
      {
        duration: 300,
      },
      () =>
        (cardOpacityReanimated.value = withTiming(1, {
          duration: 500,
        }))
    );
  }, [cardBrand]);

  useSharedValueEffect(
    () => {
      cardOpacity.current = cardOpacityReanimated.value;
      logoOpacity.current = logoOpacityReanimated.value;
    },
    cardOpacityReanimated,
    logoOpacityReanimated
  );

  return (
    <>
      <Canvas style={{ height, width }}>
        <RoundedRect x={0} y={0} width={width} height={height} r={10}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(256, 256)}
            colors={cardData.default.colors}
          />
        </RoundedRect>
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          r={10}
          opacity={cardOpacity}
        >
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
            opacity={logoOpacity}
          />
        )}
        {children}
      </Canvas>
    </>
  );
};
