import React, { useRef, useEffect } from 'react';
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

const BadgeOverlay = () => {
  const handleCloseRef = useRef<(() => Promise<boolean> | boolean | undefined) | null>(null);

  const { BuildComponent, handleBadgeButtonClick, initialLoading } = useBadgeOverlay();

  const [badge, setBadge] = React.useState<any | null>(null);
  const [anotherDisplay, setAnotherDisplay] = React.useState<boolean>(false);

  const loadBadges = React.useCallback(async () => {
    try {
      const res = await BuildComponent();
      setBadge(res?.badge ?? null);
      setAnotherDisplay(res?.anotherDisplay ?? false);
    } catch (e) {}
  }, [BuildComponent]);

  useEffect(() => {
    loadBadges();
  }, [loadBadges]);

  useEffect(() => {
    if (!initialLoading) {
      const timeoutId = setTimeout(() => {
        loadBadges();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [initialLoading, loadBadges]);

  const visible = !!badge;

  const {
    animationRef,
    starBlastRef,
    showWebp,
    chestClicked,
    handleLottiePress,
    handleAnimationFinish,
    handleOverlayPress,
    webpAnimatedStyle,
    chestAnimatedStyle,
  } = useOverlayAnimations({
    visible,
    onClose: async () => {
      if (handleCloseRef.current) {
        try {
          const res = handleCloseRef.current();
          if (res && typeof (res as any).then === 'function') {
            return await (res as Promise<boolean>);
          }
          return res as boolean | undefined;
        } catch (e) {
          return undefined;
        }
      }
      return undefined;
    },
  });

  if (visible) {
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
                        key={badge.type ?? 'starblast'}
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
                          key={badge?.type ?? 'badge-img'}
                          source={
                            badgeTypeImageMap[badge?.type as BadgeType] as ImageSourcePropType
                          }
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
                      {badge.name}
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
                      key={badge?.type ?? 'chest'}
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
                <Button
                  onPress={async () => {
                    try {
                      const { newBadge, displayState } = await handleBadgeButtonClick(badge.type);
                      setBadge(newBadge);
                      setAnotherDisplay(displayState);
                    } catch (e) {}
                  }}
                  children={anotherDisplay ? 'Voir le prochain badge' : 'Fermer'}
                  variant="primary"
                />
              </Center>
            )}
          </Center>
        </Pressable>
      </Box>
    );
  }

  return null;
};

export default BadgeOverlay;
