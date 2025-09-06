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
import { PortfolioItem } from '~/features/etf-portfolio/components/PortfolioItem';
import { PortfolioItemType } from '~/features/etf-portfolio/types/portfolioItemType';

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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Box flex={1} bg="white">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <VStack safeAreaBottom space={4} p={4} minHeight="full">
              {transactionResult ? (
                <Box flex={1} justifyContent="center" alignItems="center">
                  <TransactionStatus
                    success={transactionResult.success}
                    message={transactionResult.message}
                    onReset={() => setTransactionResult(null)}
                  />
                </Box>
              ) : (
                <VStack safeAreaBottom space={6} flex={1} justifyContent="space-between">
                  <ETFTransactionHeader />
                  <VStack flex={1} justifyContent="center" space={3}>
                    <AmountInput />
                    <PortfolioItem type={PortfolioItemType.Liquidity} />
                  </VStack>
                  <TransactionButton
                    transactionType={transactionType}
                    onTransactionResult={setTransactionResult}
                  />
                </VStack>
              )}
            </VStack>
          </ScrollView>
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
