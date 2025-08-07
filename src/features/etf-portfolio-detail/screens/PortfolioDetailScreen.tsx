import React from 'react';
import { ScrollView } from 'react-native';
import { Box, VStack } from 'native-base';
import { TransactionList } from '../components/TransactionList';
import { PortfolioBalance } from '~/features/etf-portfolio/components/PortfolioBalance';
import { PortfolioChart } from '../components/PortfolioChart';

export const PortfolioDetailScreen: React.FC = () => {
  return (
    <Box flex={1} bg="white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <VStack space={4} p={4} pb={8}>
          <PortfolioBalance />
          <PortfolioChart />
          <TransactionList />
        </VStack>
      </ScrollView>
    </Box>
  );
};
