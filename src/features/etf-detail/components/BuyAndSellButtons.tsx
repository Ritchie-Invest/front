import React from 'react';
import { HStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { Button } from '../../../components/atoms/Button';
import { TransactionType } from '../../etf-transaction/types/TransactionType';
import { useETFStore } from '~/features/etf/store/ETFStore';
import { spacing } from '~/lib/theme/theme';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const BuyAndSellButtons: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { selectedETF } = useETFStore();

  const handleBuyPress = () => {
    navigation.navigate('ETFTransaction', {
      transactionType: TransactionType.BUY,
    });
  };

  const handleSellPress = () => {
    navigation.navigate('ETFTransaction', {
      transactionType: TransactionType.SELL,
    });
  };

  if (!selectedETF) {
    return null;
  }

  return (
    <HStack space={spacing.spacingLargeFallback} width="100%">
      <Button onPress={handleBuyPress} variant="primary">
        Acheter
      </Button>
      <Button onPress={handleSellPress} variant="outline">
        Vendre
      </Button>
    </HStack>
  );
};
