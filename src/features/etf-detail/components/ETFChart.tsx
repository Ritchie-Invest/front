import React, { memo } from 'react';
import { Box, Spinner, Center, Text } from 'native-base';
import { LineChartContainer } from '~/components/organisms/components/LineChartContainer';
import { useETFChart } from '../hooks/useETFChart';
import { ETFChartProps } from '../model/ETFChartComponent';

export const ETFChart: React.FC<ETFChartProps> = memo(({ config, timeRangeConfig }) => {
  const {
    etfData,
    loading,
    error,
    selectedRange,
    handleRangeChange,
    adapter,
    defaultConfig,
    defaultTimeRangeConfig,
  } = useETFChart();

  const chartConfig = config || defaultConfig;
  const rangeConfig = timeRangeConfig || defaultTimeRangeConfig;

  if (loading) {
    return (
      <Box bg="white" p={4} rounded="lg" shadow={1} mb={4} height={chartConfig.height}>
        <Center flex={1}>
          <Spinner size="lg" color="blue.500" />
        </Center>
      </Box>
    );
  }

  if (error || !etfData) {
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
      data={etfData.priceHistory}
      adapter={adapter as any}
      selectedTimeRange={selectedRange}
      onTimeRangeChange={handleRangeChange}
      title="Évolution du prix"
      config={chartConfig}
      timeRangeConfig={rangeConfig}
      emptyStateText="Aucune donnée de prix disponible"
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
