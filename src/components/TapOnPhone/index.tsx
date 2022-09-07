import React, {useEffect} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import styles from './styles';
import tapOnPhone from '../../assets/icons/tapOnPhone.png';
import {Button, ButtonType} from '../Button';
import {useNfc} from '../../hooks/useNfc';

interface TapOnPhoneProps {
  onCancelRead(): void;
}

export const TapOnPhone = ({onCancelRead}: TapOnPhoneProps) => {
  const {onReadNfc, isLoadingCardData} = useNfc();

  useEffect(() => {
    onReadNfc();
  }, []);

  return (
    <>
      {!isLoadingCardData ? (
        <View style={styles.container}>
          <Text style={styles.title}>
            Aproxime e mantenha um cartão com NFC na parte traseira do
            dispositivo
          </Text>
          <View style={styles.content}>
            <Image
              style={styles.icon}
              source={tapOnPhone}
              resizeMode="center"
            />
          </View>
          <Button
            onPress={onCancelRead}
            text="Cancelar"
            type={ButtonType.outlined}
          />
        </View>
      ) : (
        <ActivityIndicator size={56} color="#000" />
      )}
    </>
  );
};
