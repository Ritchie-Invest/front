import React from 'react';
import { Box, Text, HStack, VStack, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Card } from '../../../components/molecules/card';
import { PortfolioPosition } from '../models';

interface ETFListItemProps {
  position: PortfolioPosition;
}

export const ETFListItem: React.FC<ETFListItemProps> = ({ position }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <Card variant="default" mb={3}>
      <HStack justifyContent="space-between" alignItems="center">
        <VStack flex={1} space={1}>
          <HStack alignItems="center" space={2}>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              {position.ticker}
            </Text>
            <Text fontSize="sm" color="gray.500" flex={1} numberOfLines={1}>
              {position.name}
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            {position.quantity} parts × {formatCurrency(position.currentPrice)}
          </Text>
        </VStack>

        <VStack alignItems="flex-end" space={1}>
          <Text fontSize="lg" fontWeight="semibold" color="gray.800">
            {formatCurrency(position.totalValue)}
          </Text>
          <HStack alignItems="center" space={1}>
            <Icon
              as={MaterialIcons}
              name={position.isGaining ? 'trending-up' : 'trending-down'}
              size="sm"
              color={position.isGaining ? 'green.500' : 'red.500'}
            />
            <Text
              fontSize="sm"
              fontWeight="medium"
              color={position.isGaining ? 'green.500' : 'red.500'}
            >
              {formatPercentage(position.priceChangePercentage)}
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Card>
  );
};
