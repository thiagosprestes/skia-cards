import React, {useEffect} from 'react';
import {
  Canvas,
  LinearGradient,
  RoundedRect,
  useSharedValueEffect,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import {CardBrand, cardBrandsColors} from '../../utils/cardBrands';
import {useSharedValue, withTiming} from 'react-native-reanimated';

interface CardProps {
  children: React.ReactElement;
  cardBrand: CardBrand;
}

export const Card = ({children, cardBrand}: CardProps) => {
  const width = 85.6 * 4;
  const height = 53.98 * 4;

  const cardOpacity = useValue(0);

  const cardOpacityReanimated = useSharedValue(0);

  useEffect(() => {
    if (cardBrand === CardBrand.default) {
      cardOpacityReanimated.value = withTiming(0);
      return;
    }

    cardOpacityReanimated.value = withTiming(1, {
      duration: 400,
    });
  }, [cardBrand, cardOpacityReanimated]);

  useSharedValueEffect(() => {
    cardOpacity.current = cardOpacityReanimated.value;
  }, cardOpacityReanimated);

  return (
    <>
      <Canvas style={{height, width}}>
        <RoundedRect x={0} y={0} width={width} height={height} r={10}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(256, 256)}
            colors={cardBrandsColors.default}
          />
        </RoundedRect>
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          r={10}
          opacity={cardOpacity}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(256, 256)}
            colors={cardBrandsColors[cardBrand]}
          />
        </RoundedRect>

        {children}
      </Canvas>
    </>
  );
};
