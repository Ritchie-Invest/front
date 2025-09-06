import React from 'react';
import { Box, Text, VStack } from '@gluestack-ui/themed';
import { PortfolioBalance } from '~/features/etf-portfolio/components/PortfolioBalance';
import { usePortfolio } from '~/features/etf-portfolio/hooks/usePortfolio';
import { useETFs } from '../hooks/useETFList';
import { ETFList } from '../components/ETFList';

export const InvestmentDashboardScreen: React.FC = () => {
  const { loading: portfolioLoading, error: portfolioError } = usePortfolio();
  const { etfs, loading: etfsLoading, error: etfsError } = useETFs();

  const loading = portfolioLoading || etfsLoading;
  const error = portfolioError || etfsError;

  if (error) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" px={4}>
        <Text fontSize={18} color="$red500" textAlign="center" mb={4}>
          Erreur lors du chargement de la page
        </Text>
        <Text fontSize={14} color="$text500" textAlign="center">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="$white">
      <VStack space="lg" px="$4" py="$6">
        <PortfolioBalance />
      </VStack>
      <ETFList positions={etfs} loading={loading} />
    </Box>
  );
};
