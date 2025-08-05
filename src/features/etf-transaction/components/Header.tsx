import React from 'react';
import { HStack, VStack, Text, Skeleton } from 'native-base';
import { formatCurrency } from '~/utils/formatCurrency';
import { useETFHeader } from '../hooks/useETFHeader';
import { useETFStore } from '~/features/etf/store/ETFStore';

interface ETFTransactionHeaderProps {
  // Props optionnelles pour la compatibilité, mais on utilisera le store en priorité
  etfId?: string;
  ticker?: string;
  currentValue?: number;
}

export const ETFTransactionHeader: React.FC<ETFTransactionHeaderProps> = ({
  etfId: propEtfId,
  ticker: propTicker,
  currentValue: propCurrentValue,
}) => {
  const { selectedETF } = useETFStore();

  // Utiliser les données du store en priorité, sinon les props
  const etfId = selectedETF?.id || propEtfId || '';
  const ticker = selectedETF?.ticker || propTicker || '';
  const currentValue = selectedETF?.currentPrice || propCurrentValue || 0;

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
