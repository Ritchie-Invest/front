import React from 'react';
import { Box, Text, VStack } from '@gluestack-ui/themed';
import { PortfolioPie } from '~/features/etf-portfolio/components/PortfolioPie';
import { usePortfolio } from '~/features/etf-portfolio/hooks/usePortfolio';
import { useETFs } from '../hooks/useETFList';
import { ETFList } from '../components/ETFList';
import { colors, margins, paddings, spacing } from '~/lib/theme/theme';

export const InvestmentDashboardScreen: React.FC = () => {
  const { loading: portfolioLoading, error: portfolioError } = usePortfolio();
  const { etfs, loading: etfsLoading, error: etfsError } = useETFs();

  const loading = portfolioLoading || etfsLoading;
  const error = portfolioError || etfsError;

  if (error) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" px={paddings.paddingSmall}>
        <Text fontSize={18} color={colors.errorColor} textAlign="center" mb={margins.marginSmall}>
          Erreur lors du chargement de la page
        </Text>
        <Text fontSize={14} color={colors.primaryTextColor} textAlign="center">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <VStack flex={1} bg={colors.mainBackgroundColor} space={spacing.spacingMediumFallback}>
      <Box>
        <PortfolioPie />
      </Box>
      <Box flex={1} backgroundColor={colors.alternativeBackgroundColor}>
        <ETFList positions={etfs} loading={loading} />
      </Box>
    </VStack>
  );
};
