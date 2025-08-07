import React, { memo, useMemo } from 'react';
import { Box, VStack, Text } from 'native-base';
import { LineChartComponent } from '~/components/molecules/components/LineChart';
import { TimeRangeSelector } from '~/components/molecules/components/TimeRangeSelector';
import { DATE_RANGE_OPTIONS } from '~/components/molecules/types/dateRange';
import type { LineChartConfig, ChartDataAdapter } from '../../molecules/models/LineChart';
import type { TimeRangeOption } from '~/components/molecules/models/TimeRange';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import type { TimeRangeSelectorConfig } from '~/components/molecules/models/TimeRange';

interface LineChartContainerProps<T = any> {
  data: T[];
  adapter: ChartDataAdapter<T>;
  selectedTimeRange: DateRangeType;
  onTimeRangeChange: (range: DateRangeType) => void;
  title?: string;
  config?: LineChartConfig;
  timeRangeConfig?: TimeRangeSelectorConfig;
  emptyStateText?: string;
  containerStyle?: {
    bg?: string;
    p?: number | string;
    rounded?: string;
    shadow?: number;
    mb?: number | string;
  };
  customTimeRangeOptions?: TimeRangeOption<DateRangeType>[];
}

const defaultContainerStyle = {
  bg: 'white',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 4,
  p: 4,
  rounded: 'lg',
  shadow: 2,
  m: 2,
};

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
    const style = useMemo(
      () => ({ ...defaultContainerStyle, ...containerStyle }),
      [containerStyle],
    );
    const timeRangeOptions = useMemo(
      () => customTimeRangeOptions || DATE_RANGE_OPTIONS,
      [customTimeRangeOptions],
    );

    return (
      <Box {...style}>
        {title && (
          <Text fontSize="lg" fontWeight="semibold" mb={4} color="gray.800">
            {title}
          </Text>
        )}

        <LineChartComponent data={chartData} config={config} emptyStateText={emptyStateText} />
        <TimeRangeSelector<DateRangeType>
          options={timeRangeOptions}
          selectedRange={selectedTimeRange}
          onRangeChange={onTimeRangeChange}
          config={timeRangeConfig}
        />
      </Box>
    );
  },
);
