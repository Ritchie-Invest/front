import React, { useEffect } from 'react';
import { Box, Text, VStack } from 'native-base';
import { PortfolioBalance } from '../components/PortfolioBalance';
import { usePortfolio } from '~/features/etf-portfolio/hooks/usePortfolio';
import { useETFList } from '../hooks/useETFList';
import { ETFList } from '../components/ETFList';
import { useETFStore } from '../../etf/store/ETFStore';

export const ETFDashboard: React.FC = () => {
  const { clearSelectedETF } = useETFStore();
  const {
    portfolio,
    totalValue,
    loading: portfolioLoading,
    error: portfolioError,
  } = usePortfolio();
  const { etfs, loading: etfsLoading, error: etfsError, refetch: refetchETFs } = useETFList();

  useEffect(() => {
    clearSelectedETF();
  }, []); // Tableau de dépendances vide pour n'exécuter qu'une fois

  const loading = portfolioLoading || etfsLoading;
  const error = portfolioError || etfsError;

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
