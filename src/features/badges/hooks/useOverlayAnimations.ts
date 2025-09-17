import { useRef, useState, useEffect } from 'react';
import { Animated } from 'react-native';
import LottieView from 'lottie-react-native';

interface useOverlayAnimationsProps {
  visible: boolean;
  onClose?: () => Promise<any> | void;
}

export const useOverlayAnimations = ({ visible, onClose }: useOverlayAnimationsProps) => {
  const animationRef = useRef<LottieView>(null);
  const starBlastRef = useRef<LottieView>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showWebp, setShowWebp] = useState(false);
  const [chestClicked, setChestClicked] = useState(false);

  const rotateValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const chestMoveValue = useRef(new Animated.Value(0)).current;
  const chestVerticalValue = useRef(new Animated.Value(0)).current;

  const handleLottiePress = () => {
    if (!isPlaying && !chestClicked) {
      setIsPlaying(true);
      setChestClicked(true);
      animationRef.current?.play();

      Animated.sequence([
        Animated.timing(chestVerticalValue, {
          toValue: -60,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(chestVerticalValue, {
          toValue: -50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const handleAnimationFinish = () => {
    setIsPlaying(false);
    setShowWebp(true);
  };

  const handleOverlayPress = () => {
    (async () => {
      if (onClose) {
        try {
          await onClose();
        } catch (err) {
          console.error('useOverlayAnimations: onClose error', err);
        }
      }
      resetAnimations();
    })();
  };

  const resetAnimations = () => {
    setIsPlaying(false);
    setShowWebp(false);
    setChestClicked(false);
    rotateValue.setValue(0);
    scaleValue.setValue(1);
    chestMoveValue.setValue(0);
    chestVerticalValue.setValue(0);
  };

  useEffect(() => {
    if (visible && !chestClicked) {
      const moveAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(chestMoveValue, {
            toValue: 10,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(chestMoveValue, {
            toValue: -10,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(chestMoveValue, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      );

      moveAnimation.start();

      return () => {
        moveAnimation.stop();
      };
    }
  }, [visible, chestClicked]);

  useEffect(() => {
    if (showWebp) {
      rotateValue.setValue(0);
      scaleValue.setValue(1);

      Animated.sequence([
        Animated.parallel([
          Animated.timing(rotateValue, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0.3,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showWebp]);

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const webpAnimatedStyle = {
    transform: [{ rotate: rotateInterpolate }, { scale: scaleValue }],
  };

  const chestAnimatedStyle = {
    transform: [{ translateX: chestMoveValue }, { translateY: chestVerticalValue }],
  };

  return {
    animationRef,
    starBlastRef,

    isPlaying,
    showWebp,
    chestClicked,

    handleLottiePress,
    handleAnimationFinish,
    handleOverlayPress,
    resetAnimations,

    webpAnimatedStyle,
    chestAnimatedStyle,
  };
};
