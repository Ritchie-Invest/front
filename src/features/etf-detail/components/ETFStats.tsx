import React from 'react';
import { HStack, VStack, Text, Box } from '@gluestack-ui/themed';
import { ETFPriceData } from '../models/ETFPriceData';
import { formatCurrency } from '~/utils/formatCurrency';

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
      <Text fontSize={12} color="$text500" textAlign="center">
        {label}
      </Text>
      <Text fontSize={14} fontWeight="medium" color="$text900" textAlign="center">
        {value}
      </Text>
    </VStack>
  );

  return (
    <Box
      bg="$white"
      p={4}
      rounded="$lg"
      shadowOffset={{ width: 0, height: 1 }}
      shadowOpacity={0.1}
      shadowRadius={2}
      elevation={1}
    >
      <Text fontSize={18} fontWeight="semibold" mb={4} color="$text900">
        Statistiques
      </Text>

      <VStack space="lg">
        <HStack space="sm">
          <StatItem label="Plus haut" value={formatCurrency(maxPrice)} />
          <StatItem label="Plus bas" value={formatCurrency(minPrice)} />
        </HStack>

        <HStack space="sm">
          <StatItem label="Volume moyen" value={Math.round(avgVolume).toLocaleString()} />
          <StatItem label="Volume actuel" value={latestData.volume.toLocaleString()} />
        </HStack>

        <HStack space="sm">
          <StatItem label="Ouverture" value={formatCurrency(latestData.open)} />
          <StatItem label="Clôture" value={formatCurrency(latestData.close)} />
        </HStack>
      </VStack>
    </Box>
  );
};
