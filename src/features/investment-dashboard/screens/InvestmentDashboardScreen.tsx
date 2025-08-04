import React from 'react';
import { Box, Text, VStack } from 'native-base';
import { PortfolioBalance } from '../components/PortfolioBalance';
import { usePortfolio } from '~/features/etf-portfolio/hooks/usePortfolio';
import { useETFs } from '../hooks/useETFs';
import { ETFList } from '../components/ETFList';

export const InvestmentDashboardScreen: React.FC = () => {
  const {
    portfolio,
    totalValue,
    loading: portfolioLoading,
    error: portfolioError,
    refetch: refetchPortfolio,
  } = usePortfolio();
  const { etfs, loading: etfsLoading, error: etfsError, refetch: refetchETFs } = useETFs();

  const loading = portfolioLoading || etfsLoading;
  const error = portfolioError || etfsError;

  const refetch = async () => {
    await Promise.all([refetchPortfolio(), refetchETFs()]);
  };

  if (error) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" px={4}>
        <Text fontSize="lg" color="red.500" textAlign="center" mb={4}>
          Erreur lors du chargement du portfolio
        </Text>
        <Text fontSize="sm" color="gray.500" textAlign="center">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box flex={1} bg="white">
      <VStack space={6} px={4} py={6}>
        <PortfolioBalance
          balance={portfolio?.balance || 0}
          totalValue={totalValue}
          loading={loading}
        />
      </VStack>
      <ETFList positions={etfs} loading={loading} />
    </Box>
  );
};
