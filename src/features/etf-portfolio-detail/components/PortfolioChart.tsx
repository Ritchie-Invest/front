import React, { memo } from 'react';
import { Box, Spinner, Center, Text } from 'native-base';
import { LineChartContainer } from '~/components/organisms/components/LineChartContainer';
import { usePortfolioChart } from '../hooks/usePortfolioChart';
import { PortfolioChartProps } from '../models/PortfolioChartComponent';

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
      <Box bg="white" p={4} rounded="lg" shadow={1} mb={4} height={chartConfig.height}>
        <Center flex={1}>
          <Spinner size="lg" color="green.500" />
        </Center>
      </Box>
    );
  }

  if (error || !portfolioData) {
    return (
      <Box bg="white" p={4} rounded="lg" shadow={1} mb={4} height={chartConfig.height}>
        <Center flex={1}>
          <Text color="red.500">Erreur lors du chargement du graphique</Text>
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
        bg: 'white',
        p: 4,
        rounded: 'lg',
        shadow: 1,
        mb: 4,
      }}
    />
  );
});
