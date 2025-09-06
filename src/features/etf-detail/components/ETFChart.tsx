import React, { memo } from 'react';
import { Box, Spinner, Center, Text } from '@gluestack-ui/themed';
import { LineChartContainer } from '~/components/organisms/components/LineChartContainer';
import { useETFChart } from '../hooks/useETFChart';
import { ETFChartProps } from '../models/ETFChartComponent';
import { ETFPriceData } from '../models/ETFPriceData';

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
      <Box
        bg="$white"
        p="$4"
        rounded="$lg"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.1}
        shadowRadius={2}
        elevation={1}
        mb="$4"
        height={chartConfig.height}
      >
        <Center flex={1}>
          <Spinner size={24} color="$blue500" />
        </Center>
      </Box>
    );
  }

  if (error || !etfData) {
    return (
      <Box
        bg="$white"
        p="$4"
        rounded="$lg"
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.1}
        shadowRadius={2}
        elevation={1}
        mb="$4"
        height={chartConfig.height}
      >
        <Center flex={1}>
          <Text color="$red500">Erreur lors du chargement du graphique</Text>
        </Center>
      </Box>
    );
  }

  return (
    <Box mb="$4">
      <LineChartContainer
        data={etfData.priceHistory}
        adapter={adapter as any}
        selectedTimeRange={selectedRange}
        onTimeRangeChange={handleRangeChange}
        title="Prix de l'ETF"
        config={chartConfig}
        timeRangeConfig={rangeConfig}
        emptyStateText="Aucune donnée de prix disponible"
        containerStyle={{
          bg: '$white',
          p: '$4',
          rounded: '$lg',
          shadow: 1,
        }}
      />
    </Box>
  );
});
