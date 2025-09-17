import React from 'react';
import { Box, Center, VStack } from '@gluestack-ui/themed';
import { ETFDetails } from '~/features/etf/components/ETFDetails';
import { colors, paddings } from '~/lib/theme/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { ResponseMessage } from '../components/ResponseMessage';
import { useTransactionStore } from '../store/TransactionStore';
import { TransactionForm } from '../components/TransactionForm';
import { useEffect } from 'react';

export const ETFTransactionScreen: React.FC = () => {
  const { error, response, clearTransaction } = useTransactionStore();

  useEffect(() => {
    clearTransaction();
  }, [clearTransaction]);

  if (response || error) {
    return (
      <Box flex={1} bg={colors.mainBackgroundColor}>
        <ResponseMessage response={response} error={error} />
      </Box>
    );
  } else {
    return (
      <Box flex={1} bg={colors.mainBackgroundColor}>
        <ETFDetails />
        <TransactionForm />
      </Box>
    );
  }
};
