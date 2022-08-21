import React, { useContext } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Card } from "../../components/Card";
import { CardBack } from "../../components/Card/CardBack";
import { CardFront } from "../../components/Card/CardFront";
import { CardSteps } from "../../components/CardSteps";
import { CardContext, CardContextProps } from "../../contexts/card";
import { styles } from "./styles";

export const Home = () => {
  const { number, expiration, holder } = useContext(
    CardContext
  ) as CardContextProps;

  const rotate = useSharedValue("0deg");
  const rotate2 = useSharedValue("90deg");

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: rotate.value,
        },
      ],
    };
  });

  const rotateStyled = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: rotate2.value,
        },
        { scaleX: -1 },
      ],
    };
  });

  const flip = () => {
    if (rotate.value === "90deg") {
      rotate2.value = withTiming(
        "90deg",
        {
          duration: 200,
          easing: Easing.linear,
        },
        (a) => {
          rotate.value = withTiming("0deg", {
            duration: 200,
            easing: Easing.linear,
          });
        }
      );
      return;
    }

    rotate.value = withTiming(
      "90deg",
      {
        duration: 200,
        easing: Easing.linear,
      },
      (a) => {
        rotate2.value = withTiming("180deg", {
          duration: 200,
          easing: Easing.linear,
        });
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={flip}>
        <View style={styles.cardContainer}>
          <Animated.View style={[rotateStyle]}>
            <Card>
              <CardFront
                cardNumber={number}
                cardExpiration={expiration}
                cardHolder={holder}
              />
            </Card>
          </Animated.View>
          <Animated.View style={[rotateStyled, { position: "absolute" }]}>
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
