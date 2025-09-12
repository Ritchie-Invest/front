import React from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack } from '@gluestack-ui/themed';
import { ETFDetails } from '~/features/etf/components/ETFDetails';
import { ETFChart } from '../components/ETFChart';
import { colors, paddings } from '~/lib/theme/theme';
import { BuyAndSellButtons } from '../components/BuyAndSellButtons';
import PageCover from '~/components/organisms/components/PageCover';
import { Screens } from '~/features/navigation/Type/Screens';

export const ETFDetailScreen: React.FC = () => {
  return (
    <Box flex={1} bg={colors.mainBackgroundColor}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack flex={1} justifyContent="space-between" alignItems="center">
          <ETFDetails />
          <ETFChart />
          <PageCover title="" Screen={Screens.ETF_DETAILS} size={100} />
          <Box>
            <BuyAndSellButtons />
          </Box>
        </VStack>
      </ScrollView>
    </Box>
  );
};
