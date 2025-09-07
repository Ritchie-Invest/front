import React from 'react';
import { HStack, Text } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { formatCurrency } from '../../../utils/formatCurrency';
import { List } from '../../../components/organisms/components/list';
import { colors, margins, spacing, typography } from '~/lib/theme/theme';
import { useETFList } from '../hooks/useETFList';

export const ETFList: React.FC = () => {
  const { etfs, loading, error, formatPercentage, isGaining, handleETFPress } = useETFList();

  return (
    <List
      data={etfs}
      loading={loading}
      title="ETF Disponibles"
      renderLeft={(etf) => (
        <>
          <HStack
            alignItems="center"
            space={spacing.spacingSmallFallback}
            mb={margins.marginMinimum}
          >
            <Text
              fontSize={18}
              fontWeight={typography.fontWeightBold}
              color={colors.primaryTextColor}
            >
              {etf.symbol}
            </Text>
          </HStack>
          <Text fontSize={14} color={colors.DarkGrey}>
            {etf.name}
          </Text>
        </>
      )}
      renderRight={(etf) => (
        <>
          <Text fontSize={18} fontWeight="semibold" color="$black">
            {formatCurrency(etf.price)}
          </Text>
          <HStack alignItems="center" space={spacing.spacingSmallFallback}>
            <MaterialIcons
              name={isGaining(etf) ? 'trending-up' : 'trending-down'}
              size={typography.bodySize}
              color={isGaining(etf) ? colors.successColor : colors.errorColor}
            />
            <Text
              fontSize={14}
              fontWeight={typography.fontWeightMedium}
              color={isGaining(etf) ? colors.successColor : colors.errorColor}
            >
              {formatPercentage(etf.variationPercent)}
            </Text>
          </HStack>
        </>
      )}
      onItemPress={handleETFPress}
    />
  );
};
