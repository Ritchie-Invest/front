import React from 'react';
import { Box, Center, Spinner, Text } from 'native-base';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { TransactionList, TransactionServiceAdapter } from '../index';

type TransactionHistoryScreenRouteProp = RouteProp<MainStackParamList, 'TransactionHistory'>;

interface TransactionHistoryScreenProps {
  transactionService?: any;
}

export const TransactionHistoryScreen: React.FC<TransactionHistoryScreenProps> = ({
  transactionService = new TransactionServiceAdapter(),
}) => {
  return (
    <Box flex={1} bg="gray.50">
      <TransactionList transactionDataService={transactionService} />
    </Box>
  );
};
