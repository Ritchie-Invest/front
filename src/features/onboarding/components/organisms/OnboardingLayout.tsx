import React from 'react';
import { VStack, HStack, Box, Progress, Pressable } from '@gluestack-ui/themed';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <VStack flex={1} bg="$white">
        <HStack alignItems="center" px="$8" py="$2" space="md">
          {showBackButton && (
            <Pressable onPress={onBackPress} p="$2">
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          )}
          <Box flex={1}>
            <Progress value={progress} bg="$gray200" height="$2" borderRadius="$2" />
          </Box>
        </HStack>

        <VStack flex={1} px="$8" height="100%">
          {children}
        </VStack>
      </VStack>
    </View>
  );
};
