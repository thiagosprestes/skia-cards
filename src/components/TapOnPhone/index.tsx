import React, {useEffect} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import styles from './styles';
import tapOnPhone from '../../assets/icons/tapOnPhone.png';
import {Button, ButtonType} from '../Button';
import {ReadCard, useNfc} from '../../hooks/useNfc';

interface TapOnPhoneProps {
  onCancelRead(): void;
}

export const TapOnPhone = ({onCancelRead}: TapOnPhoneProps) => {
  const {onReadNfc, readCardState, onRetryCardRead} = useNfc();

  const renderDefault = (
    <View style={styles.container}>
      <Text style={styles.title}>
        Aproxime e mantenha um cartão com NFC na parte traseira do dispositivo
      </Text>
      <View style={styles.content}>
        <Image style={styles.icon} source={tapOnPhone} resizeMode="center" />
      </View>
      <Button
        onPress={onCancelRead}
        text="Cancelar"
        type={ButtonType.outlined}
      />
    </View>
  );

  const renderLoading = (
    <ActivityIndicator style={styles.loading} size={56} color="#000" />
  );

  const renderError = (
    <View style={styles.container}>
      <Text style={styles.title}>
        Ocorreu um erro ao ler o cartão. Tente novamente
      </Text>
      <View style={styles.content}>
        <Image style={styles.icon} source={tapOnPhone} resizeMode="center" />
      </View>
      <Button
        onPress={onRetryCardRead}
        text="Tentar novamente"
        type={ButtonType.outlined}
      />
    </View>
  );

  useEffect(() => {
    onReadNfc();
  }, []);

  return {
    [ReadCard.default]: renderDefault,
    [ReadCard.loading]: renderLoading,
    [ReadCard.error]: renderError,
  }[readCardState];
};
