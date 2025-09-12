import React from 'react';
import { ScrollView } from 'react-native';
import { Box, Center, Image, VStack, Text } from '@gluestack-ui/themed';
import { colors, paddings, typography } from '~/lib/theme/theme';
import { TransactionList } from '../components/TransactionList';
import { PortfolioPie } from '~/features/etf-portfolio/components/PortfolioPie';
import { PortfolioLineChart } from '~/features/etf-portfolio-detail/components/PortfolioLineChart';
import { UserETFList } from '~/features/etf/components/UserETFList';
import PageCover from '~/components/organisms/components/PageCover';
import { Screens } from '~/features/navigation/Type/Screens';

export const PortfolioDetailScreen: React.FC = () => {
  return (
    <Box flex={1} bg={colors.mainBackgroundColor}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack space="md">
          <PageCover title="Votre portefeuille" Screen={Screens.PORTFOLIO} size={250} />
          <PortfolioPie />
          <PortfolioLineChart />
          <UserETFList />
          <TransactionList />
        </VStack>
      </ScrollView>
    </Box>
  );
};
