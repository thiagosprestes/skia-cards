global.Buffer = global.Buffer || require("buffer").Buffer;
import TLV from "node-tlv";
import React, { useContext, useEffect, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import nfcManager, { NfcAdapter, NfcTech } from "react-native-nfc-manager";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ApduCommand } from "../../ApduCommand";
import { ApduResponse } from "../../ApduResponse";
import { Card } from "../../components/Card";
import { CardBack } from "../../components/Card/CardBack";
import { CardFront } from "../../components/Card/CardFront";
import { StepContainer } from "../../components/CardSteps/StepContainer";
import { CardContext, CardContextProps } from "../../contexts/card";
import { useReadCard } from "../../hooks/useReadCard";
import { CardBrand, getCardBrand } from "../../utils/cardBrands";
import styles from "./styles";

export const Home = () => {
  const [cardBrand, setCardBrand] = useState(CardBrand.default);

  const { card, cardFrontPosition, cardBackPosition, flipCard, step } =
    useContext(CardContext) as CardContextProps;

  const { number, expiration, holder, securityCode } = card;

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
    const brand = getCardBrand(number!);

    if (brand) {
      setCardBrand(CardBrand[brand]);
      return;
    }

    setCardBrand(CardBrand.default);
  }, [number]);

  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      rotateX.value = interpolate(
        event.y,
        [0, 200],
        [10, -10],
        Extrapolate.CLAMP
      );
      rotateY.value = interpolate(
        event.x,
        [0, 500],
        [-10, 10],
        Extrapolate.CLAMP
      );
    })
    .onFinalize(() => {
      rotateX.value = withTiming(0);
      rotateY.value = withTiming(0);
    });

  const rotateCardStyle = useAnimatedStyle(() => {
    const rotateXValue = `${rotateX.value}deg`;
    const rotateYValue = `${rotateY.value}deg`;

    return {
      transform: [
        {
          perspective: 300,
        },
        { rotateX: rotateXValue },
        { rotateY: rotateYValue },
      ],
    };
  }, []);

  nfcManager.start();

  const { getCardData } = useReadCard();

  async function readNdef() {
    try {
      console.warn("Read tag");

      // register for the NFC tag with NDEF in it
      await nfcManager.requestTechnology(NfcTech.IsoDep, {
        isReaderModeEnabled: true,
        readerModeDelay: 10,
        readerModeFlags:
          NfcAdapter.FLAG_READER_NFC_A | NfcAdapter.FLAG_READER_SKIP_NDEF_CHECK,
      });

      // the resolved tag object will contain `ndefMessage` property
      await nfcManager.getTag();

      await getCardData();

      console.warn("Tag found");
    } catch (ex) {
      console.warn("Oops!", ex);
    } finally {
      // stop the nfc scanning
      nfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <TouchableWithoutFeedback onPress={readNdef}>
          <Animated.View style={(styles.cardContainer, rotateCardStyle)}>
            <Animated.View style={flipFront}>
              <Card cardBrand={cardBrand}>
                <CardFront
                  cardNumber={number}
                  cardExpiration={expiration}
                  cardHolder={holder}
                  step={step}
                />
              </Card>
            </Animated.View>
            <Animated.View style={[flipBack, { position: "absolute" }]}>
              <Card cardBrand={cardBrand}>
                <CardBack securityCode={securityCode} />
              </Card>
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </GestureDetector>
      <StepContainer />
    </View>
  );
};
