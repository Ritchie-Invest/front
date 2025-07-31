import React from 'react';
import { Box } from 'native-base';
import { TransactionList } from '../index';

interface TransactionHistoryScreenProps {
  transactionService?: any;
}

export const TransactionHistoryScreen: React.FC<TransactionHistoryScreenProps> = ({}) => {
  return (
    <Box flex={1} bg="gray.50">
      <TransactionList />
    </Box>
  );
};
