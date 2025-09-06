import React from 'react';
import { Box, Text, VStack } from 'native-base';
import { PortfolioBalance } from '~/features/etf-portfolio/components/PortfolioBalance';
import { usePortfolio } from '~/features/etf-portfolio/hooks/usePortfolio';
import { ETFList } from '../components/ETFList';

export const InvestmentDashboardScreen: React.FC = () => {
  const { loading: portfolioLoading, error: portfolioError } = usePortfolio();

  if (portfolioError) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" px={4}>
        <Text fontSize="lg" color="red.500" textAlign="center" mb={4}>
          Erreur lors du chargement de la page
        </Text>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          {portfolioError}
        </Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="white">
      <VStack space={6} px={4} py={6}>
        <PortfolioBalance />
      </VStack>
      <ETFList />
    </Box>
  );
};
