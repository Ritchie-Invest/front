import React from 'react';
import { HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { Button } from '../../../components/atoms/Button';
import { TransactionType } from '../../etf-transaction/types/TransactionType';
import { useETFStore } from '~/features/etf/store/ETFStore';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const BuyAndSellButtons: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { selectedETF } = useETFStore();

  const handleBuyPress = () => {
    navigation.navigate('ETFTransaction', {
      transactionType: TransactionType.Buy,
    });
  };

  const handleSellPress = () => {
    navigation.navigate('ETFTransaction', {
      transactionType: TransactionType.Sell,
    });
  };

  if (!selectedETF) {
    return null;
  }

  return (
    <HStack space={3} width="100%">
      <Button onPress={handleBuyPress} variant="primary" flex={1}>
        Acheter
      </Button>
      <Button onPress={handleSellPress} variant="outline" flex={1}>
        Vendre
      </Button>
    </HStack>
  );
};
