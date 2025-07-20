import React from 'react';
import { Box, Text, HStack, VStack, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from '../../../components/molecules/card';
import { ETFWithCurrentPrice } from '../models/etf';
import { formatCurrency } from '../utils/formatCurrency';

interface ETFListItemProps {
  etf: ETFWithCurrentPrice;
}

export const ETFListItem: React.FC<ETFListItemProps> = ({ etf }) => {
  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <Card variant="default" mb={3}>
      <HStack justifyContent="space-between" alignItems="center">
        <VStack flex={1} space={1}>
          <HStack alignItems="center" space={2}>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              {etf.ticker}
            </Text>
            <Text fontSize="sm" color="gray.500" flex={1} numberOfLines={1}>
              {etf.name}
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Prix actuel: {formatCurrency(etf.currentPrice)}
          </Text>
        </VStack>

        <VStack alignItems="flex-end" space={1}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.800">
            {formatCurrency(etf.currentPrice)}
          </Text>
          <HStack alignItems="center" space={1}>
            <Icon
              as={MaterialIcons}
              name={etf.isGaining ? 'trending-up' : 'trending-down'}
              size="sm"
              color={etf.isGaining ? 'green.500' : 'red.500'}
            />
            <Text fontSize="sm" fontWeight="medium" color={etf.isGaining ? 'green.500' : 'red.500'}>
              {formatPercentage(etf.priceChangePercentage)}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Card>
  );
};
