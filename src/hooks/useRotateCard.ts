import {StyleProp, ViewStyle} from 'react-native';
import {Gesture, PanGesture} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface HookReturn {
  gesture: PanGesture;
  rotateCardStyle: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>;
}

export const useRotateCard = (): HookReturn => {
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate(event => {
      rotateX.value = interpolate(
        event.y,
        [0, 200],
        [10, -10],
        Extrapolate.CLAMP,
      );
      rotateY.value = interpolate(
        event.x,
        [0, 500],
        [-10, 10],
        Extrapolate.CLAMP,
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
        {rotateX: rotateXValue},
        {rotateY: rotateYValue},
      ],
    };
  }, []);

  return {gesture, rotateCardStyle};
};
