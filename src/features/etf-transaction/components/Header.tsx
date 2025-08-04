import React from 'react';
import { HStack, VStack, Text, Skeleton } from 'native-base';
import { useETFTransaction } from '../hooks/useETFTransaction';
import { formatCurrency } from '~/utils/formatCurrency';

interface ETFTransactionHeaderProps {
  etfID: number;
}

export const ETFTransactionHeader: React.FC<ETFTransactionHeaderProps> = ({ etfID }) => {
  const { data, loading, error } = useETFTransaction(etfID);

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
