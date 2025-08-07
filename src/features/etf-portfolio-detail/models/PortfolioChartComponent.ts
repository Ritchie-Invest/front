import type { LineChartConfig } from '~/components/molecules/models/LineChart';
import { TimeRangeSelectorConfig } from '~/components/molecules/models/TimeRange';

export interface PortfolioChartProps {
  config?: LineChartConfig;
  timeRangeConfig?: TimeRangeSelectorConfig;
}
