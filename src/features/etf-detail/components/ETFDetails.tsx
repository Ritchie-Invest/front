import React from 'react';
import { VStack, HStack, Text, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { calculatePriceChange } from '../utils/chartHelpers';
import { formatPrice } from '../utils/chartHelpers';
import { ETFWithPriceHistory } from '~/features/etf-detail/models/ETFPriceHistory';

interface ETFDetailsProps {
  etf: ETFWithPriceHistory;
}

export const ETFDetails: React.FC<ETFDetailsProps> = ({ etf }) => {
  const priceChange = calculatePriceChange(etf.priceHistory);
  const isPositive = priceChange.percentage >= 0;

  return (
    <VStack space={2} mb={6}>
      <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack flex={1}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            {etf.ticker}
          </Text>
          <Text fontSize="sm" color="gray.600" numberOfLines={2}>
            {etf.name}
          </Text>
        </VStack>
      </HStack>

      <VStack space={1}>
        <Text fontSize="3xl" fontWeight="bold" color="gray.900">
          {formatPrice(etf.currentPrice)}
        </Text>

        <HStack alignItems="center" space={1}>
          <Icon
            as={MaterialIcons}
            name={isPositive ? 'trending-up' : 'trending-down'}
            size="sm"
            color={isPositive ? 'green.500' : 'red.500'}
          />
          <Text fontSize="md" fontWeight="medium" color={isPositive ? 'green.500' : 'red.500'}>
            {formatPrice(Math.abs(priceChange.amount))} (
            {Math.abs(priceChange.percentage).toFixed(2)}%)
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};
