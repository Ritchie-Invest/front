import React from 'react';
import { Box, HStack, Pressable } from '@gluestack-ui/themed';
import { PortfolioItem } from './PortfolioItem';
import { PortfolioItemType } from '../types/portfolioItemType';
import { usePortfolio } from '../hooks/usePortfolio';
import { PortfolioBalanceProps } from '../models/portfolioBalance';
import { margins, paddings, spacing } from '~/lib/theme/theme';

export const PortfolioBalance: React.FC<PortfolioBalanceProps> = ({ onPress }) => {
  const { portfolio, totalValue, loading } = usePortfolio();

  if (loading) {
    return (
      <Box alignItems="center" py={paddings.paddingSmall}>
        <PortfolioItem type={PortfolioItemType.TotalValue} />
      </Box>
    );
  }

  const balance = portfolio?.balance ?? 0;
  const investmentValue = totalValue - balance;

  const content = (
    <Box alignItems="center" py={paddings.paddingSmall}>
      <PortfolioItem type={PortfolioItemType.TotalValue} value={totalValue} />

      <HStack space={spacing.spacingLargeFallback} mt={margins.marginVerySmall}>
        <PortfolioItem type={PortfolioItemType.Liquidity} value={balance} />
        <PortfolioItem type={PortfolioItemType.Investment} value={investmentValue} />
      </HStack>
    </Box>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
};
