import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import styles from './styles';
import {Button, ButtonType} from '../Button';
import {ReadCard, useNfc} from '../../hooks/useNfc';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';
import smartphone from '../../assets/smartphone.png';
import card from '../../assets/card.png';
import close from '../../assets/close.png';

interface TapOnPhoneProps {
  onCancelRead(): void;
}

export const TapOnPhone = ({onCancelRead}: TapOnPhoneProps) => {
  const [showIndicator, setShowIndicator] = useState(false);

  const {onReadNfc, readCardState, onRetryCardRead} = useNfc();

  const cardAnimation = useSharedValue(30);
  const activityAnimation = useSharedValue(0);

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: cardAnimation.value,
    };
  });
  const activityAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: activityAnimation.value,
    };
  });

  const onShowLoadingIndicator = () => {
    setShowIndicator(true);
  };

  const onReadCard = () => {
    cardAnimation.value = withTiming(
      -30,
      {
        duration: 800,
      },
      isFinished => {
        if (isFinished) {
          runOnJS(onShowLoadingIndicator)();
        }
      },
    );

    activityAnimation.value = withTiming(1, {
      duration: 800,
    });
  };

  const onAnimateCard = () => {
    cardAnimation.value = withRepeat(
      withTiming(-30, {
        duration: 2000,
      }),
      100,
      true,
    );
  };

  useEffect(() => {
    onAnimateCard();
  }, []);

  useEffect(() => {
    if (readCardState === ReadCard.loading) {
      onReadCard();
    }

    if (readCardState === ReadCard.error) {
      setShowIndicator(false);
      activityAnimation.value = withTiming(0);
    }
  }, [readCardState]);

  useEffect(() => {
    onReadNfc();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Aproxime e mantenha um cartão com NFC na parte traseira do dispositivo
      </Text>
      <View style={styles.content}>
        <View style={styles.smartphoneContainer}>
          <Image
            source={smartphone}
            resizeMode="center"
            style={styles.smartphone}
          />
          {showIndicator && (
            <Animated.View style={activityAnimatedStyle}>
              <ActivityIndicator color="#000" style={styles.loading} />
            </Animated.View>
          )}
          {readCardState === ReadCard.error && (
            <Animated.Image
              source={close}
              style={styles.error}
              resizeMode="center"
              entering={ZoomIn}
            />
          )}
        </View>
        <Animated.Image
          source={card}
          style={[styles.card, cardAnimatedStyle]}
          resizeMode="center"
        />
      </View>
      {readCardState !== ReadCard.error ? (
        <Button
          onPress={onCancelRead}
          text="Cancelar"
          type={ButtonType.outlined}
        />
      ) : (
        <Button
          onPress={onRetryCardRead}
          text="Tentar novamente"
          type={ButtonType.outlined}
        />
      )}
    </View>
  );
};
