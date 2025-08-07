import React from 'react';
import { Box } from 'native-base';
import { TransactionList } from '../index';
import { PortfolioBalance } from '~/features/etf-portfolio/components/PortfolioBalance';

export const PortfolioDetailScreen: React.FC = () => {
  return (
    <Box flex={1} bg="gray.50">
      <PortfolioBalance />
      <TransactionList />
    </Box>
  );
};
