import React from 'react';
import { Box, VStack } from 'native-base';
import { useCallback } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { ETFTransactionHeader } from '../components/Header';
import { AmountInput } from '../components/AmountInput';
import { TransactionButton } from '../components/TransactionButton';
import { TransactionStatus } from '../components/TransactionStatus';
import { useTransactionStore } from '../store/TransactionStore';

type ETFTransactionScreenRouteProp = RouteProp<MainStackParamList, 'ETFTransaction'>;

export const ETFTransactionScreen: React.FC = () => {
  const route = useRoute<ETFTransactionScreenRouteProp>();
  const { transactionType } = route.params;
  const { clearTransaction, message, messageType } = useTransactionStore();

  useFocusEffect(
    useCallback(() => {
      clearTransaction();
    }, [clearTransaction]),
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box flex={1} bg="white">
        <VStack space={4} p={4} flex={1} justifyContent="space-around">
          {message && messageType ? (
            <TransactionStatus success={messageType} message={message} />
          ) : (
            <>
              <ETFTransactionHeader />
              <AmountInput />
              <TransactionButton transactionType={transactionType} />
            </>
          )}
        </VStack>
      </Box>
    </TouchableWithoutFeedback>
  );
};
