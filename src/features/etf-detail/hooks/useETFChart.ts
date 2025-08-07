import {
  useETFDetailStore,
  useETFData,
  useETFSelectedRange,
  useETFLoading,
  useETFError,
} from '../store/ETFDetailStore';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import type { LineChartConfig } from '~/components/molecules/models/LineChart';
import { TimeRangeSelectorConfig } from '~/components/molecules/models/TimeRange';
import { ETFChartDataAdapter } from '../adapters/etfChartDataAdapter';

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

export const useETFChart = () => {
  const etfData = useETFData();
  const selectedRange = useETFSelectedRange();
  const loading = useETFLoading();
  const error = useETFError();
  const setSelectedRange = useETFDetailStore((state) => state.setSelectedRange);

  const handleRangeChange = (range: DateRangeType) => {
    setSelectedRange(range);
  };

  return {
    etfData,
    loading,
    error,
    selectedRange,

    handleRangeChange,

    adapter: etfChartAdapter,
    defaultConfig: defaultEtfChartConfig,
    defaultTimeRangeConfig,
  };
};
