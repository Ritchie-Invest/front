import React, { memo } from 'react';
import { Box, Spinner, Center, Text } from '@gluestack-ui/themed';
import { LineChartContainer } from '~/components/organisms/components/LineChartContainer';
import { useETFChart } from '../hooks/useETFChart';
import { ETFChartProps } from '../models/ETFChartComponent';
import { borderRadius, colors, margins, paddings, typography } from '~/lib/theme/theme';

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
          <Spinner size={typography.heading3Size} color={colors.primaryActionColor} />
        </Center>
      </Box>
    );
  }

  if (error || !etfData) {
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
    <Box mb={margins.marginVerySmall}>
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
          bg: colors.mainBackgroundColor,
          p: paddings.paddingVerySmall,
          rounded: borderRadius.borderRadiusLargeFallback,
          shadow: 1,
        }}
      />
    </Box>
  );
});
