import React from 'react';
import { HStack, VStack, Text, Box } from 'native-base';
import { ETFPriceData, formatPrice } from '../index';

interface ETFStatsProps {
  priceHistory: ETFPriceData[];
}

export const ETFStats: React.FC<ETFStatsProps> = ({ priceHistory }) => {
  if (priceHistory.length === 0) return null;

  const prices = priceHistory.map((data) => data.close);
  const volumes = priceHistory.map((data) => data.volume);
  const highs = priceHistory.map((data) => data.high);
  const lows = priceHistory.map((data) => data.low);

  const maxPrice = Math.max(...highs);
  const minPrice = Math.min(...lows);
  const avgVolume = volumes.reduce((sum, vol) => sum + vol, 0) / volumes.length;
  const latestData = priceHistory[priceHistory.length - 1];

  const StatItem = ({ label, value }: { label: string; value: string }) => (
    <VStack alignItems="center" flex={1}>
      <Text fontSize="xs" color="gray.500" textAlign="center">
        {label}
      </Text>
      <Text fontSize="sm" fontWeight="medium" color="gray.800" textAlign="center">
        {value}
      </Text>
    </VStack>
  );

  return (
    <Box bg="white" p={4} rounded="lg" shadow={1}>
      <Text fontSize="lg" fontWeight="semibold" mb={4} color="gray.800">
        Statistiques
      </Text>

      <VStack space={4}>
        <HStack space={2}>
          <StatItem label="Plus haut" value={formatPrice(maxPrice)} />
          <StatItem label="Plus bas" value={formatPrice(minPrice)} />
        </HStack>

        <HStack space={2}>
          <StatItem label="Volume moyen" value={Math.round(avgVolume).toLocaleString()} />
          <StatItem label="Volume actuel" value={latestData.volume.toLocaleString()} />
        </HStack>

        <HStack space={2}>
          <StatItem label="Ouverture" value={formatPrice(latestData.open)} />
          <StatItem label="Clôture" value={formatPrice(latestData.close)} />
        </HStack>
      </VStack>
    </Box>
  );
};
