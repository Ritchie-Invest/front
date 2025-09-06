import React from 'react';
import { HStack, Text, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { ETFWithCurrentPrice } from '~/features/etf/models/ETFWithCurrentPrice';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useETFList } from '../hooks/useETFList';

import { List } from '../../../components/organisms/components/list';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'InvestmentDashboard'>;

export const ETFList: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { etfs, loading, formatPercentage } = useETFList();

  return (
    <List<ETFWithCurrentPrice>
      data={etfs}
      loading={loading}
      title="ETF Disponibles"
      renderLeft={(etf: ETFWithCurrentPrice) => (
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
      renderRight={(etf: ETFWithCurrentPrice) => (
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
      onItemPress={(etf: ETFWithCurrentPrice) => navigation.navigate('ETFDetails', { id: etf.id })}
    />
  );
};
