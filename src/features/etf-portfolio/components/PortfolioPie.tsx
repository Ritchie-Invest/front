import React from 'react';
import { VStack, Pressable } from '@gluestack-ui/themed';
import { PortfolioGraphProps } from '../models/PortfolioGraph';
import { PieChartContainer } from '~/components/organisms/components/PieChartContainer';
import { usePortfolioGraph } from '../hooks/usePortfolioGraph';
import { paddings, spacing } from '~/lib/theme/theme';

export const PortfolioPie: React.FC<PortfolioGraphProps> = ({
  onPress,
  cashColor,
  investmentColor,
}) => {
  const { portfolioData, adapter, formattedTotalValue, loading } = usePortfolioGraph({
    cashColor,
    investmentColor,
  });

  const content = (
    <VStack
      space={spacing.spacingMediumFallback}
      alignItems="center"
      py={paddings.paddingSmall}
      width="90%"
      mx="auto"
    >
      <PieChartContainer
        data={portfolioData}
        adapter={adapter}
        totalValue={formattedTotalValue}
        config={{
          size: 200,
          showLabels: true,
          showPercentage: true,
        }}
        emptyStateText="Aucune donnée de portfolio disponible"
      />
    </VStack>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
};
