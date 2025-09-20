import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Center, VStack } from '@gluestack-ui/themed';
import { ETFDetails } from '~/features/etf/components/ETFDetails';
import { ETFChart } from '../components/ETFChart';
import { colors, paddings, spacing } from '~/lib/theme/theme';
import { BuyAndSellButtons } from '../components/BuyAndSellButtons';
import PageCover from '~/components/organisms/components/PageCover';
import { Screen } from '~/features/navigation/Type/Screen';

export const ETFDetailScreen: React.FC = () => {
  return (
    <Box flex={1} bg={colors.mainBackgroundColor}>
      <ScrollView>
        <VStack justifyContent="space-between" gap={spacing.spacingLarge} alignItems="center">
          <ETFDetails />
          <Center>
            <ETFChart />
            <PageCover title="" Screen={Screen.ETF_DETAILS} size={100} />
          </Center>
          <Box>
            <BuyAndSellButtons />
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};
