import React from 'react';
import { HStack, Text, Box } from 'native-base';
import { ETFWithPriceHistory } from '../../etf-detail/model/etfPriceData';
import { TransactionType } from '../types/Transaction';

interface ETFHeaderProps {
  etfData: ETFWithPriceHistory;
  action: TransactionType;
}

export const ETFHeader: React.FC<ETFHeaderProps> = ({ etfData, action }) => {
  const actionText = action === TransactionType.Buy ? 'Acheter' : 'Vendre';

  return (
    <Box p={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold" color="gray.800">
          {actionText} {etfData.ticker}
        </Text>
        <Text fontSize="lg" fontWeight="semibold" color="blue.600">
          {etfData.currentPrice.toFixed(2)}€
        </Text>
      </HStack>
    </Box>
  );
};
