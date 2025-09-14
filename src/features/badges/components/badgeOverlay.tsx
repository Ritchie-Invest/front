import React from 'react';
import { Pressable, ImageSourcePropType, Animated } from 'react-native';
import { Box, Center, Image, Text } from '@gluestack-ui/themed';
import LottieView from 'lottie-react-native';
import Chest from '../../../assets/animations/chest.json';
import StarBlast from '../../../assets/animations/star-blast.json';
import { useOverlayAnimations } from '../hooks/useOverlayAnimations';
import { colors, margins, paddings, spacing, typography } from '~/lib/theme/theme';
import { Button } from '~/components/atoms/Button';
import { useBadgeOverlay } from '../hooks/useBadgeOverlay';
import { BadgeType, badgeTypeImageMap } from '../types/BadgeType';
interface BadgeOverlayProps {
  visible: boolean;
}

const BadgeOverlay: React.FC<BadgeOverlayProps> = ({ visible }) => {
  const { badge, queueLength, handleConfirmNext, handleClose, loading } = useBadgeOverlay();

  const {
    animationRef,
    starBlastRef,
    showWebp,
    chestClicked,
    handleLottiePress,
    handleAnimationFinish,
    handleOverlayPress,
    resetAnimations,
    webpAnimatedStyle,
    chestAnimatedStyle,
  } = useOverlayAnimations({ visible, onClose: handleClose });

  if (!visible) {
    return null;
  }

  const webpSource =
    badge && badge.type
      ? (badgeTypeImageMap[badge.type] ?? badgeTypeImageMap[BadgeType.LEARN_PERFECT_QUIZ])
      : require('../../../assets/images/badges/learn_perfect_quiz.webp');
  const badgeName = badge?.name || '5 leçons complétées';

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="rgba(0, 0, 0, 0.85)"
      zIndex={9999}
    >
      <Pressable style={{ flex: 1 }} onPress={handleOverlayPress}>
        <Center flex={1}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <Box
              justifyContent="center"
              alignItems="center"
              padding={paddings.paddingLarge}
              gap={spacing.spacingMedium}
            >
              {showWebp && (
                <>
                  <Box
                    width={200}
                    height={200}
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                  >
                    <LottieView
                      ref={starBlastRef}
                      source={StarBlast}
                      style={{
                        position: 'absolute',
                        width: 700,
                        height: 700,
                        zIndex: 0,
                      }}
                      loop={false}
                      autoPlay={true}
                      speed={0.5}
                      resizeMode="cover"
                    />

                    <Animated.View
                      style={[webpAnimatedStyle, { zIndex: 1, gap: spacing.spacingMedium }]}
                    >
                      <Image
                        source={webpSource}
                        alt="Animation terminée"
                        style={{
                          width: 300,
                          height: 300,
                          shadowColor: colors.warningColor,
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.9,
                          shadowRadius: 20,
                        }}
                        resizeMode="contain"
                      />
                    </Animated.View>
                  </Box>
                  <Text
                    color={colors.secondaryTextColor}
                    fontSize={typography.heading1Size}
                    fontWeight={typography.fontWeightBold}
                    textAlign="center"
                    style={{
                      textShadowColor: '#000',
                      textShadowOffset: { width: 0, height: 4 },
                      textShadowRadius: 12,
                      elevation: 10,
                    }}
                  >
                    {badgeName}
                  </Text>
                  <Text
                    color={colors.secondaryTextColor}
                    fontSize={typography.heading2Size}
                    textAlign="center"
                  >
                    Félicitations ! Vous avez gagné un badge !
                  </Text>
                </>
              )}

              <Animated.View style={chestAnimatedStyle}>
                <Pressable
                  onPress={handleLottiePress}
                  disabled={chestClicked}
                  style={{
                    opacity: chestClicked ? 0.7 : 1,
                  }}
                >
                  <LottieView
                    ref={animationRef}
                    source={Chest}
                    style={{
                      width: 200,
                      height: 200,
                    }}
                    loop={false}
                    autoPlay={false}
                    onAnimationFinish={handleAnimationFinish}
                  />
                </Pressable>
              </Animated.View>
              {!showWebp && (
                <Text
                  textAlign="center"
                  color={colors.secondaryTextColor}
                  fontWeight={typography.fontWeightMedium}
                  fontSize={typography.bodySize}
                  mt={margins.marginMedium}
                >
                  Cliquez sur le coffre pour obtenir une récompense...
                </Text>
              )}
            </Box>
          </Pressable>
          {showWebp && (
            <Center width="80%" padding={paddings.paddingMedium}>
              {queueLength > 1 ? (
                <Button
                  onPress={handleConfirmNext}
                  children={loading ? 'Chargement...' : 'Prochain badge'}
                  variant="primary"
                />
              ) : (
                <Button onPress={handleOverlayPress} children="Terminer" variant="primary" />
              )}
            </Center>
          )}
        </Center>
      </Pressable>
    </Box>
  );
};

export default BadgeOverlay;
