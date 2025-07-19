import React from 'react';
import { RefreshControl } from 'react-native';
import { ScrollView, VStack, Box, Text } from 'native-base';
import { PortfolioBalance, ETFList } from '../components';
import { usePortfolio } from '../hooks';

export const InvestmentDashboardScreen: React.FC = () => {
  const { portfolio, positions, totalValue, loading, error, refetch } = usePortfolio();

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
    <ScrollView
      flex={1}
      bg="white"
      refreshControl={<RefreshControl refreshing={loading} onRefresh={refetch} />}
    >
      <VStack space={6} px={4} py={6}>
        <PortfolioBalance
          balance={portfolio?.balance || 0}
          totalValue={totalValue}
          loading={loading}
        />

        <ETFList positions={positions} loading={loading} />
      </VStack>
    </ScrollView>
  );
};
