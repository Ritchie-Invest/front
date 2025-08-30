import React from 'react';
import { HStack, Text, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ETFWithCurrentPrice } from '../models/etf';
import { formatCurrency } from '../../../utils/formatCurrency';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { List } from '../../../components/organisms/components/list';

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
          <HStack alignItems="center" space={2}>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              {etf.ticker}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {etf.name}
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            Prix actuel: {formatCurrency(etf.currentPrice)}
          </Text>
        </>
      )}
      renderRight={(etf) => (
        <>
          <Text fontSize="lg" fontWeight="semibold" color="gray.800">
            {formatCurrency(etf.currentPrice)}
          </Text>
          <HStack alignItems="center" space={1}>
            <Icon
              as={MaterialIcons}
              name={etf.isGaining ? 'trending-up' : 'trending-down'}
              size="sm"
              color={etf.isGaining ? 'green.500' : 'red.500'}
            />
            <Text fontSize="sm" fontWeight="medium" color={etf.isGaining ? 'green.500' : 'red.500'}>
              {formatPercentage(etf.priceChangePercentage)}
            </Text>
          </HStack>
        </>
      )}
      onItemPress={(etf) => navigation.navigate('ETFDetails', { etfID: etf.etfID })}
    />
  );
};
