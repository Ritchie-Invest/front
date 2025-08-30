import React, { memo } from 'react';
import { VStack, HStack, Text, Icon, Spinner, Center } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { formatCurrency } from '~/utils/formatCurrency';
import { useETFDetails } from '../hooks/useETFDetails';

const ETFStaticInfo = memo(({ ticker, name }: { ticker: string; name: string }) => {
  return (
    <HStack justifyContent="space-between" alignItems="flex-start">
      <VStack flex={1}>
        <Text fontSize="2xl" fontWeight="bold" color="gray.800">
          {ticker}
        </Text>
        <Text fontSize="sm" color="gray.600" numberOfLines={2}>
          {name}
        </Text>
      </VStack>
    </HStack>
  );
});

const ETFPriceDisplay = memo(({ currentPrice }: { currentPrice: number }) => {
  return (
    <Text fontSize="3xl" fontWeight="bold" color="gray.900">
      {formatCurrency(currentPrice)}
    </Text>
  );
});

const ETFPriceChange = memo(
  ({
    priceChange,
    isPositive,
  }: {
    priceChange: { amount: number; percentage: number };
    isPositive: boolean;
  }) => {
    return (
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
    );
  },
);

const ETFDynamicData = memo(
  ({
    priceChange,
    isPositive,
    dynamicLoading,
  }: {
    priceChange: { amount: number; percentage: number };
    isPositive: boolean;
    dynamicLoading: boolean;
  }) => {
    if (dynamicLoading) {
      return (
        <HStack alignItems="center" space={1}>
          <Spinner size="sm" color="blue.500" />
          <Text fontSize="sm" color="gray.500">
            Calcul...
          </Text>
        </HStack>
      );
    }

    return <ETFPriceChange priceChange={priceChange} isPositive={isPositive} />;
  },
);

export const ETFDetails: React.FC = memo(() => {
  const { staticLoading, dynamicLoading, error, staticData, priceChange, isPositive } =
    useETFDetails();

  if (staticLoading) {
    return (
      <Center py={4}>
        <Spinner size="lg" color="blue.500" />
      </Center>
    );
  }

  if (error || !staticData) {
    return (
      <Center py={4}>
        <Text color="red.500">
          {error ? 'Erreur lors du chargement des données' : 'Aucune donnée disponible'}
        </Text>
      </Center>
    );
  }

  return (
    <VStack space={2} mb={6}>
      <ETFStaticInfo ticker={staticData.ticker} name={staticData.name} />

      <VStack space={1}>
        <ETFPriceDisplay currentPrice={staticData.currentPrice} />

        <ETFDynamicData
          priceChange={priceChange}
          isPositive={isPositive}
          dynamicLoading={dynamicLoading}
        />
      </VStack>
    </VStack>
  );
});
