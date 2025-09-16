import React, { memo, useRef } from 'react';
import { Box, Spinner, Center, Text } from '@gluestack-ui/themed';
import { View } from 'react-native';
import { LineChartContainer } from '~/components/organisms/components/LineChartContainer';
import { usePortfolioChart } from '../hooks/usePortfolioChart';
import { borderRadius, colors, paddings, margins, typography } from '~/lib/theme/theme';
import { formatCurrency } from '~/utils/formatCurrency';
import { LineChartConfig } from '~/components/molecules/models/LineChart';
import { TimeRangeSelectorConfig } from '~/components/molecules/models/TimeRange';

export interface PortfolioLineChartProps {
  config?: LineChartConfig;
  timeRangeConfig?: TimeRangeSelectorConfig;
}

export const PortfolioLineChart: React.FC<PortfolioLineChartProps> = memo(
  ({ config, timeRangeConfig }) => {
    const startRef = useRef<{ x: number; y: number } | null>(null);
    const {
      portfolioData,
      loading,
      error,
      selectedRange,
      handleRangeChange,
      adapter,
      adapter2,
      variation,
      variationPercent,
      variationDirection,
      defaultConfig,
      defaultTimeRangeConfig,
      seriesLabels,
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

    if (portfolioData.length < 2) {
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
            <Text color={colors.primaryTextColor} textAlign="center">
              Vous venez de créer votre compte, vous pourrez bientôt voir son évolution ici 💰
            </Text>
          </Center>
        </Box>
      );
    }

    return (
      <Box mb={margins.marginVerySmall}>
        <Box width="$full" alignItems="center" marginBottom={margins.marginSmall}>
          <Text fontSize={typography.heading5Size} fontWeight={typography.fontWeightBold}>
            {formatCurrency(variation)}
          </Text>
          <Text
            fontSize={typography.heading6Size}
            color={
              variationDirection === 'UP'
                ? colors.successColor
                : variationDirection === 'DOWN'
                  ? colors.errorColor
                  : colors.secondaryTextColor
            }
          >
            {variationDirection === 'UP' ? '▲' : variationDirection === 'DOWN' ? '▼' : ''}{' '}
            {variationPercent}%
          </Text>
        </Box>
        <View
          onStartShouldSetResponder={() => false}
          onMoveShouldSetResponder={(e) => {
            const native = e.nativeEvent as any;
            const pageX = native.pageX ?? native.locationX ?? 0;
            const pageY = native.pageY ?? native.locationY ?? 0;
            const start = startRef.current as { x: number; y: number } | null;
            if (!start) {
              startRef.current = { x: pageX, y: pageY };
              return false;
            }
            const dx = Math.abs(pageX - start.x);
            const dy = Math.abs(pageY - start.y);
            return dx > dy && dx > 4;
          }}
          onResponderRelease={() => {
            startRef.current = null;
          }}
        >
          <LineChartContainer
            data={portfolioData}
            adapter={adapter as any}
            data2={adapter2 ? portfolioData : undefined}
            adapter2={adapter2 as any}
            selectedTimeRange={selectedRange}
            onTimeRangeChange={handleRangeChange}
            title="Évolution du portfolio"
            config={chartConfig}
            timeRangeConfig={rangeConfig}
            emptyStateText="Aucune donnée de portfolio disponible"
            legendLabels={seriesLabels}
            containerStyle={{
              bg: colors.mainBackgroundColor,
              p: paddings.paddingVerySmall,
              rounded: borderRadius.borderRadiusLargeFallback,
              shadow: 1,
            }}
          />
        </View>
      </Box>
    );
  },
);
