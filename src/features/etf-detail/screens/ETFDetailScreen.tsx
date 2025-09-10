import React from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack } from '@gluestack-ui/themed';
import { ETFDetails } from '~/features/etf/components/ETFDetails';
import { ETFChart } from '../components/ETFChart';
import { colors, paddings, spacing } from '~/lib/theme/theme';
import { BuyAndSellButtons } from '../components/BuyAndSellButtons';

export const ETFDetailScreen: React.FC = () => {
  return (
    <Box flex={1} bg={colors.mainBackgroundColor}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack space={spacing.spacingLargeFallback} p={paddings.paddingLarge}>
          <ETFDetails />
          <ETFChart />
          <Box p={4}>
            <BuyAndSellButtons />
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};
