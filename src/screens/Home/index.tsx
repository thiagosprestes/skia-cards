import React, { useContext } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Card } from "../../components/Card";
import { CardBack } from "../../components/Card/CardBack";
import { CardFront } from "../../components/Card/CardFront";
import { CardSteps } from "../../components/CardSteps";
import { CardContext, CardContextProps } from "../../contexts/card";
import { styles } from "./styles";

export const Home = () => {
  const { card, cardFrontPosition, cardBackPosition, flipCard } = useContext(
    CardContext
  ) as CardContextProps;

  const { number, expiration, holder } = card;

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

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={flipCard}>
        <View style={styles.cardContainer}>
          <Animated.View style={flipFront}>
            <Card>
              <CardFront
                cardNumber={number}
                cardExpiration={expiration}
                cardHolder={holder}
              />
            </Card>
          </Animated.View>
          <Animated.View style={[flipBack, { position: "absolute" }]}>
            <Card>
              <CardBack />
            </Card>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <CardSteps />
    </View>
  );
};
