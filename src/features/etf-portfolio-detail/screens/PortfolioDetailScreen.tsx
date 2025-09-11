import React from 'react';
import { FlatList } from 'react-native';
import { Box, VStack } from '@gluestack-ui/themed';
import { colors, paddings } from '~/lib/theme/theme';
import { TransactionList } from '../components/TransactionList';
import { PortfolioPie } from '~/features/etf-portfolio/components/PortfolioPie';
import { PortfolioChart } from '../components/PortfolioChart';
import { UserETFList } from '~/features/etf/components/UserETFList';

export const PortfolioDetailScreen: React.FC = () => {
  const renderContent = () => (
    <VStack space="md" p={paddings.paddingMedium} pb={paddings.paddingExtraLarge}>
      <PortfolioPie />
      <PortfolioChart />
      <UserETFList />
      <TransactionList />
    </VStack>
  );

  return (
    <Box flex={1} bg={colors.mainBackgroundColor}>
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
