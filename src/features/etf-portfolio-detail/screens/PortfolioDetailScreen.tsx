import React from 'react';
import { FlatList } from 'react-native';
import { Box, VStack } from 'native-base';
import { TransactionList } from '../components/TransactionList';
import { PortfolioBalance } from '~/features/etf-portfolio/components/PortfolioBalance';
import { PortfolioChart } from '../components/PortfolioChart';

export const PortfolioDetailScreen: React.FC = () => {
  const renderContent = () => (
    <VStack space={4} p={4} pb={8}>
      <PortfolioBalance />
      <PortfolioChart />
      <TransactionList />
    </VStack>
  );

  return (
    <Box flex={1} bg="white">
      <FlatList
        data={[1]}
        renderItem={renderContent}
        keyExtractor={() => 'portfolio-content'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </Box>
  );
};
