import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text, HStack, VStack, Icon } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Card } from '../../../components/molecules/card';
import { ETFWithCurrentPrice } from '../models/etf';
import { formatCurrency } from '../utils/formatCurrency';
import { MainStackParamList } from '../../../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'InvestmentDashboard'>;

interface ETFListItemProps {
  etf: ETFWithCurrentPrice;
}

export const ETFListItem: React.FC<ETFListItemProps> = ({ etf }) => {
  const navigation = useNavigation<NavigationProp>();

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const handlePress = () => {
    navigation.navigate('ETFDetails', { etfID: etf.etfID });
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card variant="default" mb={3}>
        <HStack justifyContent="space-between" alignItems="center">
          <VStack flex={1} space={1}>
            <HStack alignItems="center" space={2}>
              <Text fontSize="lg" fontWeight="bold" color="gray.800">
                {etf.ticker}
              </Text>
              <Text fontSize="sm" color="gray.500" flex={1} numberOfLines={1}>
                {etf.name}
              </Text>
            </HStack>
            <Text fontSize="sm" color="gray.600">
              Prix actuel: {formatCurrency(etf.currentPrice)}
            </Text>
          </VStack>

          <VStack alignItems="flex-end" space={1}>
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
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={etf.isGaining ? 'green.500' : 'red.500'}
              >
                {formatPercentage(etf.priceChangePercentage)}
              </Text>
            </HStack>
          </VStack>
        </HStack>
      </Card>
    </TouchableOpacity>
  );
};
