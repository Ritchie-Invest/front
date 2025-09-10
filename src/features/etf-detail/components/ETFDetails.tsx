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
    variation,
    variationPercent,
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
    <HStack justifyContent="space-between" alignItems="flex-start">
      <VStack
        space={spacing.spacingMediumFallback}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Text fontSize={typography.heading1Size} fontWeight="bold" color={colors.primaryTextColor}>
          {etf.ticker}
        </Text>
        <Text fontSize={typography.heading3Size} color={colors.primaryTextColor} numberOfLines={2}>
          {etf.name}
        </Text>
      </VStack>
      <VStack
        space={spacing.spacingSmallFallback}
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Text
          textAlign="right"
          fontSize={typography.heading2Size}
          fontWeight="bold"
          color={colors.primaryTextColor}
        >
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
            {formatCurrency(Math.abs(variation))} ({Math.abs(variationPercent).toFixed(2)}%)
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
});
