import React, { memo } from 'react';
import { Box, Spinner, Center, Text } from '@gluestack-ui/themed';
import { LineChartContainer } from '~/components/organisms/components/LineChartContainer';
import { usePortfolioChart } from '../hooks/usePortfolioChart';
import { PortfolioChartProps } from '../models/PortfolioChartComponent';
import { borderRadius, colors, paddings, margins, typography } from '~/lib/theme/theme';

export const PortfolioChart: React.FC<PortfolioChartProps> = memo(({ config, timeRangeConfig }) => {
  const {
    portfolioData,
    loading,
    error,
    selectedRange,
    handleRangeChange,
    adapter,
    defaultConfig,
    defaultTimeRangeConfig,
  } = usePortfolioChart();

  const chartConfig = config || defaultConfig;
  const rangeConfig = timeRangeConfig || defaultTimeRangeConfig;

  if (loading) {
    return (
      <Box
        bg={colors.mainBackgroundColor}
        p={paddings.paddingVerySmall}
        rounded={borderRadius.borderRadiusLarge}
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.1}
        shadowRadius={2}
        elevation={1}
        mb={margins.marginVerySmall}
        height={chartConfig.height}
      >
        <Center flex={1}>
          <Spinner size={typography.heading3Size} color={colors.successColor} />
        </Center>
      </Box>
    );
  }

  if (error || !portfolioData) {
    return (
      <Box
        bg={colors.mainBackgroundColor}
        p={paddings.paddingVerySmall}
        rounded={borderRadius.borderRadiusLarge}
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.1}
        shadowRadius={2}
        elevation={1}
        mb={margins.marginVerySmall}
        height={chartConfig.height}
      >
        <Center flex={1}>
          <Text color={colors.errorColor}>Erreur lors du chargement du graphique</Text>
        </Center>
      </Box>
    );
  }

  return (
    <LineChartContainer
      data={portfolioData}
      adapter={adapter as any}
      selectedTimeRange={selectedRange}
      onTimeRangeChange={handleRangeChange}
      title="Évolution du portfolio"
      config={chartConfig}
      timeRangeConfig={rangeConfig}
      emptyStateText="Aucune donnée de portfolio disponible"
      containerStyle={{
        bg: colors.mainBackgroundColor,
        p: paddings.paddingVerySmall,
        rounded: borderRadius.borderRadiusLargeFallback,
        shadow: 1,
      }}
    />
  );
});
