import React, { useContext, useEffect, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Card, CardBrand } from "../../components/Card";
import { CardBack } from "../../components/Card/CardBack";
import { CardFront } from "../../components/Card/CardFront";
import { CardSteps } from "../../components/CardSteps";
import { CardContext, CardContextProps } from "../../contexts/card";
import { styles } from "./styles";

export const Home = () => {
  const [cardBrand, setCardBrand] = useState(CardBrand.DEFAULT);

  const { card, cardFrontPosition, cardBackPosition, flipCard } = useContext(
    CardContext
  ) as CardContextProps;

  const { number, expiration, holder, securityCode } = card;

  const cardNumberToString = String(number);

  const getCardColor = {
    "3": CardBrand.AMEX,
    "4": CardBrand.VISA,
    "5": CardBrand.MASTERCARD,
    "6": CardBrand.HIPERCARD,
  }[cardNumberToString.charAt(0)];

  const flipFront = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: cardFrontPosition.value,
        },
      ],
    };
  });

  const flipBack = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: cardBackPosition.value,
        },
        { scaleX: -1 },
      ],
    };
  });

  useEffect(() => {
    if (
      cardNumberToString.length >= 2 &&
      cardNumberToString.slice(0, 2) === "50"
    ) {
      setCardBrand(CardBrand.ELO);
      return;
    }

    if (cardNumberToString.length >= 2) {
      setCardBrand(getCardColor ?? CardBrand.DEFAULT);
      return;
    }

    setCardBrand(CardBrand.DEFAULT);
  }, [number]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={flipCard}>
        <View style={styles.cardContainer}>
          <Animated.View style={flipFront}>
            <Card cardBrand={cardBrand}>
              <CardFront
                cardNumber={number}
                cardExpiration={expiration}
                cardHolder={holder}
              />
            </Card>
          </Animated.View>
          <Animated.View style={[flipBack, { position: "absolute" }]}>
            <Card cardBrand={cardBrand}>
              <CardBack securityCode={securityCode} />
            </Card>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <CardSteps />
    </View>
  );
};
