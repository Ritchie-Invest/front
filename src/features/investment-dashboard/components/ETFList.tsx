import React from 'react';
import { HStack, Text } from '@gluestack-ui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { ETFWithCurrentPrice } from '~/features/etf/models/ETFWithCurrentPrice';
import { formatCurrency } from '../../../utils/formatCurrency';

import { List } from '../../../components/organisms/components/list';
import { colors, margins, spacing, typography } from '~/lib/theme/theme';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'InvestmentDashboard'>;

interface ETFListProps {
  positions: ETFWithCurrentPrice[];
  loading?: boolean;
}

export const ETFList: React.FC<ETFListProps> = ({ positions, loading = false }) => {
  const navigation = useNavigation<NavigationProp>();

  const formatPercentage = (percentage: number) =>
    `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;

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
              {etf.ticker}
            </Text>
            <Text fontSize={14} color={colors.Grey}>
              {etf.name}
            </Text>
          </HStack>
          <Text fontSize={14} color={colors.DarkGrey}>
            Prix actuel: {formatCurrency(etf.currentPrice)}
          </Text>
        </>
      )}
      renderRight={(etf) => (
        <>
          <Text fontSize={18} fontWeight="semibold" color="$black">
            {formatCurrency(etf.currentPrice)}
          </Text>
          <HStack alignItems="center" space={spacing.spacingSmallFallback}>
            <MaterialIcons
              name={etf.isGaining ? 'trending-up' : 'trending-down'}
              size={typography.bodySize}
              color={etf.isGaining ? colors.successColor : colors.errorColor}
            />
            <Text
              fontSize={14}
              fontWeight={typography.fontWeightMedium}
              color={etf.isGaining ? colors.successColor : colors.errorColor}
            >
              {formatPercentage(etf.priceChangePercentage)}
            </Text>
          </HStack>
        </>
      )}
      onItemPress={(etf) => navigation.navigate('ETFDetails', { id: etf.id })}
    />
  );
};
