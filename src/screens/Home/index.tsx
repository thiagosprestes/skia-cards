import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {Card} from '../../components/Card';
import {CardBack} from '../../components/Card/CardBack';
import {CardFront} from '../../components/Card/CardFront';
import {CardContext, CardContextProps} from '../../contexts/card';
import {useRotateCard} from '../../hooks/useRotateCard';
import {CardBrand, getCardBrand} from '../../utils/cardBrands';
import styles from './styles';
import nfcIcon from '../../assets/icons/nfc.png';
import formIcon from '../../assets/icons/form.png';
import {TapOnPhone} from '../../components/TapOnPhone';
import {CardForm} from '../../components/CardForm';

enum InsertNumber {
  nfc = 'nfc',
  manual = 'manual',
}

export const Home = () => {
  const [cardBrand, setCardBrand] = useState(CardBrand.default);

  const {gesture, rotateCardStyle} = useRotateCard();

  const {card, cardFrontPosition, cardBackPosition, flipCard, selectedField} =
    useContext(CardContext) as CardContextProps;

  const [insertNumberType, setInsertNumberType] = useState<InsertNumber>();

  const {number, expiration, holder, securityCode} = card;

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
        {scaleX: -1},
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

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <GestureDetector gesture={gesture}>
          <TouchableWithoutFeedback onPress={flipCard}>
            <Animated.View style={(styles.cardContainer, rotateCardStyle)}>
              <Animated.View style={flipFront}>
                <Card cardBrand={cardBrand}>
                  <CardFront
                    cardNumber={number}
                    cardExpiration={expiration}
                    cardHolder={holder}
                    selectedField={selectedField}
                  />
                </Card>
              </Animated.View>
              <Animated.View style={[flipBack, styles.cardBack]}>
                <Card cardBrand={cardBrand}>
                  <CardBack securityCode={securityCode} />
                </Card>
              </Animated.View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </GestureDetector>
      </View>
      {!insertNumberType ? (
        <View style={styles.insertNumberContainer}>
          <Text style={styles.title}>
            Como deseja inserir o número do cartão?
          </Text>
          <View style={styles.insertNumberOptions}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setInsertNumberType(InsertNumber.nfc)}>
              <Image style={styles.icon} source={nfcIcon} resizeMode="center" />
              <Text style={styles.buttonText}>Aproximação</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setInsertNumberType(InsertNumber.manual)}>
              <Image
                style={styles.icon}
                source={formIcon}
                resizeMode="center"
              />
              <Text style={styles.buttonText}>Manualmente</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        {
          [InsertNumber.nfc]: (
            <TapOnPhone onCancelRead={() => setInsertNumberType(undefined)} />
          ),
          [InsertNumber.manual]: (
            <CardForm onCancel={() => setInsertNumberType(undefined)} />
          ),
        }[insertNumberType]
      )}
    </View>
  );
};
