import React from 'react';
import { VStack, HStack, IconButton, Box, Progress } from 'native-base';
import { View } from 'react-native-safe-area-context';
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
      <VStack flex={1} bg="white">
        <HStack alignItems="center" px="8" py="2" space={3}>
          {showBackButton && (
            <IconButton
              icon={<Ionicons name="arrow-back" size={24} color="black" />}
              onPress={onBackPress}
              variant="ghost"
            />
          )}
          <Box flex={1}>
            <Progress
              value={progress}
              bg="gray.200"
              _filledTrack={{ bg: 'blue.500' }}
              height="2"
              borderRadius="2"
            />
          </Box>
        </HStack>

        <VStack flex={1} px="8" height="100%">
          {children}
        </VStack>
      </VStack>
    </View>
  );
};
