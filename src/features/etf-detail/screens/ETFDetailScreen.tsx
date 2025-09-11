import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack } from '@gluestack-ui/themed';
import { ETFDetails } from '~/features/etf/components/ETFDetails';
import { ETFChart } from '../components/ETFChart';
import { colors, paddings } from '~/lib/theme/theme';
import { BuyAndSellButtons } from '../components/BuyAndSellButtons';
import { useTransactionStore } from '~/features/etf-transaction/store/TransactionStore';

export const ETFDetailScreen: React.FC = () => {
  const { clearTransaction } = useTransactionStore();

  useEffect(() => {
    clearTransaction();
  }, [clearTransaction]);

  return (
    <Box flex={1} bg={colors.mainBackgroundColor}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack
          flex={1}
          justifyContent="space-between"
          p={paddings.paddingLarge}
          alignItems="center"
        >
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
