import React from 'react';
import { Box, Text } from '@gluestack-ui/themed';
import { formatCurrency } from '../../../utils/formatCurrency';
import { usePortfolioItem } from '../hooks/usePortfolioItem';
import { UsePortfolioItemProps } from '../models/portfolioBalance';
import { PortfolioItemType } from '../types/portfolioItemType';
import { colors, typography } from '~/lib/theme/theme';

export const PortfolioItem: React.FC<UsePortfolioItemProps> = ({ type, value, label }) => {
  const { displayValue, displayLabel, config, loading } = usePortfolioItem({
    type,
    value,
    label,
  });

  if (loading) {
    return (
      <Box alignItems="center">
        <Text fontSize={typography.bodySize} color={colors.primaryTextColor}>
          Chargement...
        </Text>
      </Box>
    );
  }

  return (
    <Box alignItems="center">
      {type !== PortfolioItemType.TotalValue && (
        <Text fontSize={typography.bodySize} color="$text500" mb={1}>
          {displayLabel}
        </Text>
      )}
      <Text
        fontSize={config.fontSize}
        fontWeight={config.fontWeight}
        color={config.color}
        mb={type === PortfolioItemType.TotalValue ? 2 : 0}
      >
        {formatCurrency(displayValue)}
      </Text>
      {type === PortfolioItemType.TotalValue && (
        <Text fontSize={18} color="$text600">
          {displayLabel}
        </Text>
      )}
    </Box>
  );
};
