import React from 'react';
import { RefreshControl, FlatList } from 'react-native';
import { VStack, Box, Text } from 'native-base';
import { PortfolioBalance } from '../components/PortfolioBalance';
import { ETFListItem } from '../components/ETFListItem';
import { usePortfolio } from '../hooks/usePortfolio';
import { useETFs } from '../hooks/useETFs';

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
      <FlatList
        data={etfs}
        keyExtractor={(item) => item.etfID.toString()}
        renderItem={({ item }) => <ETFListItem etf={item} />}
        ListHeaderComponent={
          <VStack space={6} px={4} py={6}>
            <PortfolioBalance
              balance={portfolio?.balance || 0}
              totalValue={totalValue}
              loading={loading}
            />
            {etfs.length > 0 && (
              <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={-2}>
                ETF Disponibles
              </Text>
            )}
          </VStack>
        }
        ListEmptyComponent={
          <VStack space={6} px={4} py={6}>
            <PortfolioBalance
              balance={portfolio?.balance || 0}
              totalValue={totalValue}
              loading={loading}
            />
            <Box flex={1} justifyContent="center" alignItems="center" py={8}>
              <Text fontSize="lg" color="gray.500" textAlign="center">
                Aucun ETF disponible
              </Text>
              <Text fontSize="sm" color="gray.400" textAlign="center" mt={2}>
                Les ETF seront bientôt disponibles
              </Text>
            </Box>
          </VStack>
        }
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </Box>
  );
};
