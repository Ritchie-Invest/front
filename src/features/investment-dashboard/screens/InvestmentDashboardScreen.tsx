import React from 'react';
import { Box, Text, VStack } from 'native-base';
import { PortfolioBalance } from '~/features/etf-portfolio/components/PortfolioBalance';
import { usePortfolio } from '~/features/etf-portfolio/hooks/usePortfolio';
import { useETFs } from '../hooks/useETFs';
import { ETFList } from '../components/ETFList';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { MainStackParamList } from '../../../navigation/AppNavigator';

export const InvestmentDashboardScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const { loading: portfolioLoading, error: portfolioError } = usePortfolio();
  const { etfs, loading: etfsLoading, error: etfsError } = useETFs();

  const loading = portfolioLoading || etfsLoading;
  const error = portfolioError || etfsError;

  if (error) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" px={4}>
        <Text fontSize="lg" color="red.500" textAlign="center" mb={4}>
          Erreur lors du chargement de la page
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
          onPress={() => {
            navigation.navigate('PortfolioDetail');
          }}
        />
      </VStack>
      <ETFList positions={etfs} loading={loading} />
    </Box>
  );
};
