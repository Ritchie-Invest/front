import React, { memo, useMemo } from 'react';
import { Box, VStack, Text } from '@gluestack-ui/themed';
import { PieChartComponent } from '~/components/molecules/components/PieChart';
import type { PieChartConfig, PieChartDataAdapter } from '../../molecules/models/PieChart';
import { borderRadius, colors, margins, paddings, spacing, typography } from '~/lib/theme/theme';
import ChartLabel from '~/components/molecules/components/ChartLabels';

interface PieChartContainerProps<T = any> {
  data: T[];
  adapter: PieChartDataAdapter<T>;
  title?: string;
  config?: Partial<PieChartConfig>;
  emptyStateText?: string;
  containerStyle?: {
    flex?: number;
    bg?: string;
    p?: number | string;
    m?: number | string;
    rounded?: string;
    shadow?: number;
  };
  totalValue?: string;
  centerComponent?: React.ReactNode;
  onPress?: () => void;
  legendLabels?: string[];
}

export const PieChartContainer = <T,>(props: PieChartContainerProps<T>) => {
  const {
    data,
    adapter,
    config,
    emptyStateText,
    containerStyle = {},
    totalValue,
    centerComponent,
    onPress,
    legendLabels,
  } = props;
  const chartData = useMemo(() => adapter.adaptData(data), [adapter, data]);

  const centerLabelComponent = useMemo(() => {
    if (centerComponent) return centerComponent;

    return null;
  }, [centerComponent, totalValue]);

  const finalConfig = useMemo(
    () => ({
      ...config,
      centerLabelComponent,
    }),
    [config, centerLabelComponent],
  );

  if (!data || data.length === 0) {
    return (
      <Box
        {...containerStyle}
        bg={colors.mainBackgroundColor}
        justifyContent="center"
        alignItems="center"
        p={paddings.paddingVerySmall}
        rounded={borderRadius.borderRadiusLarge}
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.2}
        shadowRadius={3}
        m={margins.marginVerySmall}
      >
        <Text fontSize={typography.heading6Size} color={colors.primaryTextColor}>
          {emptyStateText || 'Aucune donnée disponible'}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      {...containerStyle}
      bg={colors.mainBackgroundColor}
      justifyContent="center"
      alignItems="center"
      width="$full"
      p={paddings.paddingMedium}
      rounded={borderRadius.borderRadiusLarge}
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.2}
      shadowRadius={3}
      elevation={2}
      m={margins.marginSmall}
    >
      <VStack space={spacing.spacingMediumFallback} width="$full" alignItems="center">
        <PieChartComponent
          data={chartData}
          config={finalConfig}
          emptyStateText={emptyStateText}
          onPress={onPress}
        />
        {legendLabels && legendLabels.length > 0 && (
          <VStack space={spacing.spacingSmallFallback} alignItems="center" mt={margins.marginSmall}>
            <Box flexDirection="row" alignItems="center" justifyContent="center" flexWrap="wrap">
              {legendLabels.map((label: string, idx: number) => {
                const fromDataColor =
                  chartData && chartData[idx] && (chartData[idx].color as string | undefined);
                const fromDefaultColors = config?.defaultColors && config.defaultColors[idx];
                const colorKey = fromDataColor ?? fromDefaultColors ?? colors.primaryActionColor;
                return (
                  <ChartLabel color={colorKey} label={label} idx={idx} key={`legend-${idx}`} />
                );
              })}
            </Box>
          </VStack>
        )}
      </VStack>
    </Box>
  );
};
