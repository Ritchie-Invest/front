import React, { memo, useMemo } from 'react';
import { Box, VStack, Text } from '@gluestack-ui/themed';
import { LineChartComponent } from '~/components/molecules/components/LineChart';
import { TimeRangeSelector } from '~/components/molecules/components/TimeRangeSelector';
import { DATE_RANGE_OPTIONS } from '~/components/molecules/types/dateRange';
import type { LineChartConfig, ChartDataAdapter } from '../../molecules/models/LineChart';
import type { TimeRangeOption } from '~/components/molecules/models/TimeRange';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import type { TimeRangeSelectorConfig } from '~/components/molecules/models/TimeRange';
import { borderRadius, colors, margins, paddings, spacing, typography } from '~/lib/theme/theme';

interface LineChartContainerProps<T = any> {
  data: T[];
  adapter: ChartDataAdapter<T>;
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
}

export const LineChartContainer = memo(
  <T,>({
    data,
    adapter,
    selectedTimeRange,
    onTimeRangeChange,
    title,
    config,
    timeRangeConfig,
    emptyStateText,
    containerStyle = {},
    customTimeRangeOptions,
  }: LineChartContainerProps<T>) => {
    const chartData = useMemo(() => adapter.adaptData(data), [adapter, data]);
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
        bg={colors.mainBackgroundColor}
        flex={1}
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

          <LineChartComponent data={chartData} config={config} />
        </VStack>
      </Box>
    );
  },
);

LineChartContainer.displayName = 'LineChartContainer';
