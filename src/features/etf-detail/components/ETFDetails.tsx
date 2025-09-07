import React, { memo } from 'react';
import { VStack, HStack, Text, Icon, Spinner, Center } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { formatCurrency } from '~/utils/formatCurrency';
import { useETFDetails } from '../hooks/useETFDetails';
import { colors, margins, paddings, spacing, typography } from '~/lib/theme/theme';

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
      <Center py={paddings.paddingRegular}>
        <Spinner />
      </Center>
    );
  }

  if (error || !etf) {
    return (
      <Center py={paddings.paddingRegular}>
        <Text color={colors.errorColor}>Erreur lors du chargement des détails de l'ETF.</Text>
      </Center>
    );
  }

  return (
    <VStack space={spacing.spaceMinimumFallback} mb={margins.marginSmall}>
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

      <VStack space="sm">
        <Text fontSize={30} fontWeight="bold" color="$gray900">
          {formatCurrency(etf.currentPrice)}
        </Text>

        <HStack alignItems="center" space={spacing.spacingOneFallback}>
          <MaterialIcons
            name={isPositive ? 'trending-up' : 'trending-down'}
            size={typography.bodySize}
            color={isPositive ? colors.successColor : colors.errorColor}
          />
          <Text
            fontSize={typography.bodySize}
            fontWeight={typography.fontWeightMedium}
            color={isPositive ? colors.successColor : colors.errorColor}
          >
            {formatCurrency(Math.abs(priceChange.amount))} (
            {Math.abs(priceChange.percentage).toFixed(2)}%)
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
});
