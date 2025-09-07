import React from 'react';
import { HStack, Text } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { ETF } from '~/features/etf/models/ETF';
import { formatCurrency } from '../../../utils/formatCurrency';

import { List } from '../../../components/organisms/components/list';
import { colors, margins, spacing, typography } from '~/lib/theme/theme';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'InvestmentDashboard'>;

interface ETFListProps {
  positions: ETF[];
  loading?: boolean;
}

export const ETFList: React.FC<ETFListProps> = ({ positions, loading = false }) => {
  const navigation = useNavigation<NavigationProp>();

  const formatPercentage = (percentage: number) =>
    `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;

  const isGaining = (etf: ETF) => etf.variationDirection === 'UP';

  return (
    <List
      data={positions}
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
      onItemPress={(etf) => navigation.navigate('ETFDetails', { id: etf.id })}
    />
  );
};
