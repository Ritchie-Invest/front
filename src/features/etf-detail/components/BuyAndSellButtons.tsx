import React from 'react';
import { HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { Button } from '../../../components/atoms/Button';
import { TransactionType } from '../../etf-transaction/types/TransactionType';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface BuyAndSellButtonsProps {
  etfID: number;
}

export const BuyAndSellButtons: React.FC<BuyAndSellButtonsProps> = ({ etfID }) => {
  const navigation = useNavigation<NavigationProp>();

  const handleBuyPress = () => {
    navigation.navigate('ETFTransaction', {
      etfID,
      transactionType: TransactionType.Buy,
    });
  };

  const handleSellPress = () => {
    navigation.navigate('ETFTransaction', {
      etfID,
      transactionType: TransactionType.Sell,
    });
  };

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
