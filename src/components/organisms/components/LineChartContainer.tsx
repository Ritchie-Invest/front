import React from 'react';
import { Box, VStack, Text } from 'native-base';
import { LineChartComponent } from '~/components/molecules/components/LineChart';
import { TimeRangeSelector } from '~/components/molecules/components/TimeRangeSelector';
import { DATE_RANGE_OPTIONS } from '~/features/etf-detail';
import type { LineChartConfig, ChartDataAdapter } from '../../molecules/models/LineChart';
import type { TimeRangeOption } from '~/components/molecules/models/TimeRange';
import type { DateRangeType } from '~/features/etf-detail';
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

export const LineChartContainer = <T,>({
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
  const chartData = adapter.adaptData(data);
  const style = { ...defaultContainerStyle, ...containerStyle };

  const timeRangeOptions = customTimeRangeOptions || DATE_RANGE_OPTIONS;

  return (
    <Box {...style}>
      {title && (
        <Text fontSize="lg" fontWeight="semibold" mb={4} color="gray.800">
          {title}
        </Text>
      )}

      <LineChartComponent data={chartData} config={config} emptyStateText={emptyStateText} />
      <TimeRangeSelector
        options={timeRangeOptions}
        selectedRange={selectedTimeRange}
        onRangeChange={onTimeRangeChange}
        config={timeRangeConfig}
      />
    </Box>
  );
};
