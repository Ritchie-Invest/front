import React from 'react';
import {
  VStack,
  HStack,
  Box,
  Progress,
  Pressable,
  ProgressFilledTrack,
} from '@gluestack-ui/themed';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { borderRadius, colors, paddings, spacing, typography } from '~/lib/theme/theme';
import ProgressBar from '~/components/molecules/components/ProgressBar';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  progress: number;
  onBackPress?: () => void;
  showBackButton?: boolean;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  progress,
  onBackPress,
  showBackButton = true,
}) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.componentBackgroundColor }}>
      <VStack flex={1}>
        <HStack
          alignItems="center"
          px={paddings.paddingMedium}
          py={paddings.paddingSmall}
          gap={spacing.spacingMedium}
        >
          {showBackButton && (
            <Pressable onPress={onBackPress} p={paddings.paddingSmall}>
              <Ionicons
                name="arrow-back"
                size={typography.heading1Size}
                color={colors.primaryTextColor}
              />
            </Pressable>
          )}
          <Box width="80%">
            <ProgressBar value={progress} />
          </Box>
        </HStack>

        <VStack flex={1} px="$8" height="100%">
          {children}
        </VStack>
      </VStack>
    </View>
  );
};
