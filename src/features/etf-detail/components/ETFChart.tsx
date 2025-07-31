import React from 'react';
import { LineChartContainer } from '~/components/organisms/components/LineChartContainer';
import { ETFChartDataAdapter } from '../adapters/etfChartDataAdapter';
import { ETFPriceData } from '../model/etfPriceData';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import type { LineChartConfig } from '~/components/molecules/models/LineChart';
import { TimeRangeSelectorConfig } from '~/components/molecules/models/TimeRange';

interface ETFChartProps {
  priceHistory: ETFPriceData[];
  selectedRange: DateRangeType;
  onRangeChange: (range: DateRangeType) => void;
  title?: string;
  config?: LineChartConfig;
  timeRangeConfig?: TimeRangeSelectorConfig;
}

const etfChartAdapter = new ETFChartDataAdapter();

const defaultEtfChartConfig: LineChartConfig = {
  height: 240,
  lineColor: '#3B82F6',
  activePointColor: '#3B82F6',
  showVerticalLine: true,
  verticalLineColor: '#E5E7EB',
  endPointRadius: 4,
  animated: true,
};

const defaultTimeRangeConfig: TimeRangeSelectorConfig = {
  activeColor: 'blue.500',
  inactiveColor: 'gray.100',
  activeTextColor: 'white',
  inactiveTextColor: 'gray.700',
  justifyContent: 'center',
  marginBottom: 4,
};

export const ETFChart: React.FC<ETFChartProps> = ({
  priceHistory,
  selectedRange,
  onRangeChange,
  title = 'Évolution du prix',
  config = defaultEtfChartConfig,
  timeRangeConfig = defaultTimeRangeConfig,
}) => {
  return (
    <LineChartContainer
      data={priceHistory}
      adapter={etfChartAdapter}
      selectedTimeRange={selectedRange}
      onTimeRangeChange={onRangeChange}
      title={title}
      config={config}
      timeRangeConfig={timeRangeConfig}
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
};
