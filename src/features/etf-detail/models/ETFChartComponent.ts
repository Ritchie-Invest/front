import { LineChartConfig } from '~/components/molecules/models/LineChart';
import { TimeRangeSelectorConfig } from '~/components/molecules/models/TimeRange';

export interface ETFChartProps {
  config?: LineChartConfig;
  timeRangeConfig?: TimeRangeSelectorConfig;
}
