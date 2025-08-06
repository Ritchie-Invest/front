import React from 'react';
import { Box, Text } from 'native-base';
import { formatCurrency } from '../../../utils/formatCurrency';
import { usePortfolioItem } from '../hooks/usePortfolioItem';
import { UsePortfolioItemProps } from '../models/portfolioItem';
import { PortfolioItemType } from '../types/portfolioItemType';

export const PortfolioItem: React.FC<UsePortfolioItemProps> = ({ type, value, label }) => {
  const { displayValue, displayLabel, config, loading } = usePortfolioItem({
    type,
    value,
    label,
  });

  if (loading) {
    return (
      <Box alignItems="center">
        <Text fontSize="md" color="gray.400">
          Chargement...
        </Text>
      </Box>
    );
  }

  return (
    <Box alignItems="center">
      {type !== PortfolioItemType.TotalValue && (
        <Text fontSize="md" color="gray.500" mb={1}>
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
        <Text fontSize="lg" color="gray.600">
          {displayLabel}
        </Text>
      )}
    </Box>
  );
};
