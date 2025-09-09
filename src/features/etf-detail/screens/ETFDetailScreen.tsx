import React from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack } from '@gluestack-ui/themed';
import { ETFDetails } from '../components/ETFDetails';
import { ETFChart } from '../components/ETFChart';
import { colors, paddings, spacing } from '~/lib/theme/theme';

export const ETFDetailScreen: React.FC = () => {
  return (
    <Box flex={1} bg={colors.mainBackgroundColor}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack space={spacing.spacingLargeFallback} p={paddings.paddingLarge}>
          <ETFDetails />
          <ETFChart />
        </VStack>
      </ScrollView>
    </Box>
  );
};
