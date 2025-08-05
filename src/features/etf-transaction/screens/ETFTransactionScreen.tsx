import React from 'react';
import { Box, VStack, ScrollView } from 'native-base';
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
  const { clearInputsOnly, message, messageType } = useTransactionStore();

  useFocusEffect(
    useCallback(() => {
      clearInputsOnly();
    }, [clearInputsOnly]),
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box flex={1} bg="white">
        <ScrollView
          flex={1}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <VStack space={4} p={4} flex={1} minHeight="100%">
            {message && messageType ? (
              <Box flex={1} justifyContent="center">
                <TransactionStatus success={messageType === 'success'} message={message} />
              </Box>
            ) : (
              <>
                <ETFTransactionHeader />
                <Box flex={1} justifyContent="center" minHeight="200">
                  <AmountInput />
                </Box>
                <Box pb={20}>
                  <TransactionButton transactionType={transactionType} />
                </Box>
              </>
            )}
          </VStack>
        </ScrollView>
      </Box>
    </TouchableWithoutFeedback>
  );
};
