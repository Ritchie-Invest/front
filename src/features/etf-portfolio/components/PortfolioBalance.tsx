import React from 'react';
import { Box, HStack } from 'native-base';
import { PortfolioItem } from './PortfolioItem';
import { PortfolioItemType } from '../types/portfolioItemType';
import { usePortfolio } from '../hooks/usePortfolio';

export const PortfolioBalance: React.FC = () => {
  const { portfolio, totalValue, loading } = usePortfolio();

  if (loading) {
    return (
      <Box alignItems="center" py={6}>
        <PortfolioItem type={PortfolioItemType.TotalValue} />
      </Box>
    );
  }

  const balance = portfolio?.balance ?? 0;
  const investmentValue = totalValue - balance;

  return (
    <Box alignItems="center" py={6}>
      <PortfolioItem type={PortfolioItemType.TotalValue} value={totalValue} />

      <HStack space={4} mt={4}>
        <PortfolioItem type={PortfolioItemType.Liquidity} value={balance} />
        <PortfolioItem type={PortfolioItemType.Investment} value={investmentValue} />
      </HStack>
    </Box>
  );
};
