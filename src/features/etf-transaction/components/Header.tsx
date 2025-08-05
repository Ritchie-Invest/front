import React from 'react';
import { HStack, VStack, Text, Skeleton } from 'native-base';
import { formatCurrency } from '~/utils/formatCurrency';
import { useETFHeader } from '../hooks/useETFHeader';
import { useETFStore } from '~/features/etf/store/ETFStore';

export const ETFTransactionHeader: React.FC = ({}) => {
  const { selectedETF } = useETFStore();

  const etfId = selectedETF?.id || '';
  const ticker = selectedETF?.ticker || '';
  const currentValue = selectedETF?.currentPrice || 0;

  const { data, loading, error } = useETFHeader(etfId, ticker, currentValue);

  if (loading) {
    return (
      <VStack space={3} mb={6}>
        <HStack justifyContent="space-between" alignItems="center">
          <Skeleton.Text lines={1} w="20%" />
          <Skeleton.Text lines={1} w="25%" />
        </HStack>
        <Skeleton.Text lines={1} w="30%" />
      </VStack>
    );
  }

  if (error || !data) {
    return (
      <VStack space={2} mb={6}>
        <Text fontSize="md" color="red.500">
          Erreur lors du chargement des données
        </Text>
      </VStack>
    );
  }

  return (
    <VStack space={3} mb={6}>
      <HStack justifyContent="space-between" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          {data.ticker}
        </Text>
        <Text fontSize="2xl" fontWeight="bold" color="gray.900">
          {formatCurrency(data.currentPrice)}
        </Text>
      </HStack>

      <Text fontSize="md" color="gray.600">
        Possédé: {formatCurrency(data.ownedValue)}
      </Text>
    </VStack>
  );
};
