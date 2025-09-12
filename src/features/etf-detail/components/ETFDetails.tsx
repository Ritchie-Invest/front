import React, { memo } from 'react';
import { VStack, HStack, Text, Icon, Spinner, Center } from 'native-base';
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
      <Center py={10}>
        <Spinner />
      </Center>
    );
  }

  if (error || !etf) {
    return (
      <Center py={10}>
        <Text color="red.500">Erreur lors du chargement des détails de l'ETF.</Text>
      </Center>
    );
  }

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
          {formatCurrency(etf.currentPrice)}
        </Text>

        <HStack alignItems="center" space={1}>
          <Icon
            as={MaterialIcons}
            name={isPositive ? 'trending-up' : 'trending-down'}
            size="sm"
            color={isPositive ? 'green.500' : 'red.500'}
          />
          <Text fontSize="md" fontWeight="medium" color={isPositive ? 'green.500' : 'red.500'}>
            {formatCurrency(Math.abs(priceChange.amount))} (
            {Math.abs(priceChange.percentage).toFixed(2)}%)
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
});
