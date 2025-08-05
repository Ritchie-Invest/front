import React from 'react';
import { Box, Center, Text, VStack } from 'native-base';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { ETFTransactionHeader } from '../components/Header';
import { TransactionType } from '../types/TransactionType';
import { AmountInput } from '../components/AmountInput';
import { TransactionButton } from '../components/TransactionButton';
import { useTransactionStore } from '../store/TransactionStore';
import { useCallback } from 'react';

type ETFTransactionScreenRouteProp = RouteProp<MainStackParamList, 'ETFTransaction'>;

export const ETFTransactionScreen: React.FC = () => {
  const route = useRoute<ETFTransactionScreenRouteProp>();
  const { transactionType } = route.params;
  const { clearTransaction } = useTransactionStore();

  useFocusEffect(
    useCallback(() => {
      clearTransaction();
    }, [clearTransaction]),
  );

  return (
    <Box flex={1} bg="gray.50">
      <VStack space={4} p={4}>
        <ETFTransactionHeader />

        <Center flex={1}>
          <VStack space={8} alignItems="center" width="100%">
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              {transactionType === TransactionType.Buy ? 'Acheter' : 'Vendre'}
            </Text>

            <AmountInput />

            <TransactionButton transactionType={transactionType} />
          </VStack>
        </Center>
      </VStack>
    </Box>
  );
};
