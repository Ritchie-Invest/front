import React, { memo } from 'react';
import { VStack, HStack, Text, Icon, Spinner, Center } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { formatCurrency } from '~/utils/formatCurrency';
import { useETFDetails } from '../hooks/useETFDetails';

export const ETFDetails: React.FC = memo(() => {
  const {
    staticData: etf,
    staticLoading: isLoading,
    error,
    priceChange,
    isPositive,
  } = useETFDetails();

  if (isLoading) {
    return (
      <Center py="$10">
        <Spinner />
      </Center>
    );
  }

  if (error || !etf) {
    return (
      <Center py="$10">
        <Text color="$red500">Erreur lors du chargement des détails de l'ETF.</Text>
      </Center>
    );
  }

  return (
    <VStack space="sm" mb="$6">
      <HStack justifyContent="space-between" alignItems="flex-start">
        <VStack flex={1}>
          <Text fontSize={24} fontWeight="bold" color="$text900">
            {etf.ticker}
          </Text>
          <Text fontSize={14} color="$text600" numberOfLines={2}>
            {etf.name}
          </Text>
        </VStack>
      </HStack>

      <VStack space={1}>
        <Text fontSize={30} fontWeight="bold" color="$gray900">
          {formatCurrency(etf.currentPrice)}
        </Text>

        <HStack alignItems="center" space={1}>
          <Icon
            as={MaterialIcons}
            name={isPositive ? 'trending-up' : 'trending-down'}
            size={16}
            color={isPositive ? '$green500' : '$red500'}
          />
          <Text fontSize={16} fontWeight="medium" color={isPositive ? '$green500' : '$red500'}>
            {formatCurrency(Math.abs(priceChange.amount))} (
            {Math.abs(priceChange.percentage).toFixed(2)}%)
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
});
