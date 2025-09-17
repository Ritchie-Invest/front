import React, { memo, useMemo } from 'react';
import { Box, VStack, Text, HStack } from '@gluestack-ui/themed';
import { LineChartComponent } from '~/components/molecules/components/LineChart';
import { TimeRangeSelector } from '~/components/molecules/components/TimeRangeSelector';
import { DATE_RANGE_OPTIONS } from '~/components/molecules/types/dateRange';
import type { LineChartConfig, ChartDataAdapter } from '../../molecules/models/LineChart';
import type { TimeRangeOption } from '~/components/molecules/models/TimeRange';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import type { TimeRangeSelectorConfig } from '~/components/molecules/models/TimeRange';
import { borderRadius, colors, margins, paddings, spacing, typography } from '~/lib/theme/theme';
import { ScrollView } from 'react-native-gesture-handler';
import ChartLabel from '~/components/molecules/components/ChartLabels';

interface LineChartContainerProps<T = any> {
  data: T[];
  adapter: ChartDataAdapter<T>;
  data2?: T[];
  adapter2?: ChartDataAdapter<T>;
  selectedTimeRange: DateRangeType;
  onTimeRangeChange: (range: DateRangeType) => void;
  title?: string;
  config?: Partial<LineChartConfig>;
  timeRangeConfig?: Partial<TimeRangeSelectorConfig>;
  emptyStateText?: string;
  containerStyle?: {
    flex?: number;
    bg?: string;
    p?: number | string;
    m?: number | string;
    rounded?: string;
    shadow?: number;
  };
  customTimeRangeOptions?: TimeRangeOption<DateRangeType>[];

  legendLabels?: string[];
}

export const LineChartContainer = memo(
  <T,>({
    data,
    adapter,
    data2,
    adapter2,
    selectedTimeRange,
    onTimeRangeChange,
    title,
    config,
    timeRangeConfig,
    emptyStateText,
    containerStyle = {},
    customTimeRangeOptions,
    legendLabels,
  }: LineChartContainerProps<T>) => {
    const chartData = useMemo(() => adapter.adaptData(data), [adapter, data]);
    const chartData2 = useMemo(() => {
      if (!data2 || !adapter2) return undefined;
      return adapter2.adaptData(data2);
    }, [adapter2, data2]);
    const timeRangeOptions = useMemo(
      () => customTimeRangeOptions || DATE_RANGE_OPTIONS,
      [customTimeRangeOptions],
    );

    if (!data || data.length === 0) {
      return (
        <Box
          {...containerStyle}
          bg={colors.mainBackgroundColor}
          flex={1}
          justifyContent="center"
          alignItems="center"
          p={paddings.paddingVerySmall}
          rounded={borderRadius.borderRadiusLarge}
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.2}
          shadowRadius={3}
          elevation={2}
          m={margins.marginVerySmall}
        >
          <Text fontSize={typography.heading6Size} color="$textSecondary">
            {emptyStateText || 'Aucune donnée disponible'}
          </Text>
        </Box>
      );
    }

    return (
      <Box
        {...containerStyle}
        justifyContent="center"
        alignItems="center"
        p={paddings.paddingMedium}
        rounded={borderRadius.borderRadiusLarge}
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.2}
        shadowRadius={3}
        elevation={2}
        m={margins.marginSmall}
      >
        <VStack space={spacing.spacingMediumFallback} width="$full" padding={paddings.paddingSmall}>
          <TimeRangeSelector
            options={timeRangeOptions}
            selectedRange={selectedTimeRange}
            onRangeChange={onTimeRangeChange}
            config={timeRangeConfig}
          />
          {title && (
            <Text
              fontSize={typography.heading5Size}
              fontWeight={typography.fontWeightBold}
              textAlign="center"
              margin={margins.marginMedium}
            >
              {title}
            </Text>
          )}
          <ScrollView horizontal>
            <LineChartComponent data={chartData} data2={chartData2} config={config} />
          </ScrollView>

          {legendLabels && legendLabels.length > 0 && (
            <VStack
              space={spacing.spacingSmallFallback}
              alignItems="center"
              mt={margins.marginSmall}
            >
              <Box flexDirection="row" alignItems="center" justifyContent="center" flexWrap="wrap">
                {legendLabels.map((label: string, idx: number) => {
                  const colorKey =
                    idx === 0
                      ? ((config?.lineColor as string | undefined) ?? colors.primaryActionColor)
                      : ((config?.lineColor2 as string | undefined) ?? colors.warningColor);
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
  },
);

LineChartContainer.displayName = 'LineChartContainer';
