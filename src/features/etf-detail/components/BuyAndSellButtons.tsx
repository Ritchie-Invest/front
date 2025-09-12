import React from 'react';
import { Center, HStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { Button } from '../../../components/atoms/Button';
import { TransactionType } from '../../etf-transaction/types/TransactionType';
import { useETFStore } from '~/features/etf/store/ETFStore';
import { paddings, spacing } from '~/lib/theme/theme';
import { Screens } from '~/features/navigation/Type/Screens';
type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

export const BuyAndSellButtons: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { selectedETF } = useETFStore();

  const handleBuyPress = () => {
    navigation.navigate(Screens.TRANSACTION, {
      transactionType: TransactionType.BUY,
    });
  };

  const handleSellPress = () => {
    navigation.navigate(Screens.TRANSACTION, {
      transactionType: TransactionType.SELL,
    });
  };

  if (!selectedETF) {
    return null;
  }

  return (
    <HStack space={spacing.spacingLargeFallback} width="100%" padding={paddings.paddingMedium}>
      <Center width="50%">
        <Button onPress={handleBuyPress}>Acheter</Button>
      </Center>
      <Center width="50%">
        <Button onPress={handleSellPress} variant="secondary">
          Vendre
        </Button>
      </Center>
    </HStack>
  );
};
