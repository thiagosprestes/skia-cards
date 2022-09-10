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
import nfcManager from 'react-native-nfc-manager';

interface TapOnPhoneProps {
  onCancelRead(): void;
}

export const TapOnPhone = ({onCancelRead}: TapOnPhoneProps) => {
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

  const onReadCard = () => {
    cardAnimation.value = withTiming(-30, {
      duration: 800,
    });

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

  const handleOnRetry = () => {
    cardAnimation.value = withTiming(
      30,
      {
        duration: 0,
      },
      () => {
        cardAnimation.value = withRepeat(
          withTiming(-30, {
            duration: 2000,
          }),
          100,
          true,
        );
      },
    );

    onRetryCardRead();
  };

  useEffect(() => {
    onAnimateCard();
    onReadNfc();
  }, []);

  useEffect(() => {
    if (readCardState === ReadCard.loading) {
      onReadCard();
    }
  }, [readCardState]);

  const renderDefault = (
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
        </View>
        <Animated.Image
          source={card}
          style={[styles.card, cardAnimatedStyle]}
          resizeMode="center"
        />
      </View>
      <Button
        onPress={() => {
          onCancelRead();
          nfcManager.cancelTechnologyRequest();
        }}
        text="Cancelar"
        type={ButtonType.outlined}
      />
    </View>
  );

  const renderLoading = (
    <View style={styles.container}>
      <Text style={styles.title}>
        Mantenha o cartão em contato com o smartphone
      </Text>
      <View style={styles.content}>
        <View style={styles.smartphoneContainer}>
          <Image
            source={smartphone}
            resizeMode="center"
            style={styles.smartphone}
          />
          <Animated.View style={activityAnimatedStyle}>
            <ActivityIndicator color="#000" style={styles.loading} />
          </Animated.View>
        </View>
        <Animated.Image
          source={card}
          style={[styles.card, cardAnimatedStyle]}
          resizeMode="center"
        />
      </View>
      <Button
        onPress={onCancelRead}
        text="Cancelar"
        type={ButtonType.outlined}
      />
    </View>
  );

  const renderError = (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ocorreu um erro ao ler o cartão. Tente novamente
      </Text>
      <View style={styles.content}>
        <View style={styles.smartphoneContainer}>
          <Image
            source={smartphone}
            resizeMode="center"
            style={styles.smartphone}
          />
          <Animated.Image
            source={close}
            style={styles.error}
            resizeMode="center"
            entering={ZoomIn}
          />
        </View>
        <Animated.Image
          source={card}
          style={[styles.card, cardAnimatedStyle]}
          resizeMode="center"
        />
      </View>
      <Button
        onPress={handleOnRetry}
        text="Tentar novamente"
        type={ButtonType.outlined}
      />
    </View>
  );

  return {
    [ReadCard.default]: renderDefault,
    [ReadCard.loading]: renderLoading,
    [ReadCard.error]: renderError,
  }[readCardState];
};
