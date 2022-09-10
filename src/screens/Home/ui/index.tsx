import React from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {SharedValue, useAnimatedStyle} from 'react-native-reanimated';
import {Card} from '../../../components/Card';
import {CardBack} from '../../../components/Card/CardBack';
import {CardFront} from '../../../components/Card/CardFront';
import styles from './styles';
import nfcIcon from '../../../assets/icons/nfc.png';
import formIcon from '../../../assets/icons/form.png';
import {TapOnPhone} from '../../../components/TapOnPhone';
import {CardForm} from '../../../components/CardForm';
import {CardBrand} from '../../../utils/cardBrands';
import {useRotateCard} from '../../../hooks/useRotateCard';
import {CardField} from '../../../contexts/card';

export enum State {
  default = 'default',
  loading = 'loading',
}

export enum InsertNumber {
  nfc = 'nfc',
  manual = 'manual',
}

interface HomeProps {
  state: State;
  cardBrand: CardBrand;
  cardFrontPosition: SharedValue<string>;
  cardBackPosition: SharedValue<string>;
  flipCard(): void;
  selectedField?: CardField | null;
  insertNumberType?: InsertNumber;
  expiration?: string;
  holder?: string;
  number?: number;
  securityCode?: number;
  onSelectNfc(): void;
  onResetSelectedInsertNumberType(): void;
  onGoToForm(): void;
  hasNfc: boolean;
}

export const Home = ({
  state,
  cardBrand,
  cardFrontPosition,
  cardBackPosition,
  flipCard,
  selectedField,
  insertNumberType,
  expiration,
  holder,
  securityCode,
  onSelectNfc,
  number,
  onResetSelectedInsertNumberType,
  onGoToForm,
  hasNfc,
}: HomeProps) => {
  const {gesture, rotateCardStyle} = useRotateCard();

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

  const renderDefault = (
    <>
      {!insertNumberType ? (
        <View style={styles.insertNumberContainer}>
          <Text style={styles.title}>
            Como deseja inserir o número do cartão?
          </Text>
          <View style={styles.insertNumberOptions}>
            <TouchableOpacity style={styles.button} onPress={onSelectNfc}>
              <Image style={styles.icon} source={nfcIcon} resizeMode="center" />
              <Text style={styles.buttonText}>Aproximação</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onGoToForm}>
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
            <TapOnPhone onCancelRead={onResetSelectedInsertNumberType} />
          ),
          [InsertNumber.manual]: (
            <CardForm onCancel={onResetSelectedInsertNumberType} />
          ),
        }[insertNumberType]
      )}
    </>
  );

  const renderLoading = (
    <ActivityIndicator style={styles.loading} size={56} color="#000" />
  );

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
                    cardBrand={cardBrand}
                    hasNfc={hasNfc}
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
      {
        {
          [State.default]: renderDefault,
          [State.loading]: renderLoading,
        }[state]
      }
    </View>
  );
};
