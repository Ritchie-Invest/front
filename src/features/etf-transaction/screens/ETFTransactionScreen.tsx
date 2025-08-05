import React from 'react';
import { Box, VStack, ScrollView, KeyboardAvoidingView } from 'native-base';
import { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
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
  const { clearInputsOnly } = useTransactionStore();
  const [transactionResult, setTransactionResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  useFocusEffect(
    useCallback(() => {
      clearInputsOnly();
      setTransactionResult(null);
    }, [clearInputsOnly]),
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box flex={1} bg="white">
          <ScrollView
            flex={1}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <VStack space={4} p={4} flex={1}>
              {transactionResult ? (
                <Box flex={1} justifyContent="center" alignItems="center">
                  <TransactionStatus
                    success={transactionResult.success}
                    message={transactionResult.message}
                    onReset={() => setTransactionResult(null)}
                  />
                </Box>
              ) : (
                <Box flex={1} justifyContent={'space-around'}>
                  <ETFTransactionHeader />
                  <AmountInput />
                  <TransactionButton
                    transactionType={transactionType}
                    onTransactionResult={setTransactionResult}
                  />
                </Box>
              )}
            </VStack>
          </ScrollView>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
