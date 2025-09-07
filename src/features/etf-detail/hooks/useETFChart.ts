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
import { ETFChartDataAdapter } from '../adapters/ETFChartDataAdapter';
import { colors, margins } from '~/lib/theme/theme';

const etfChartAdapter = new ETFChartDataAdapter();

const defaultEtfChartConfig: LineChartConfig = {
  height: 240,
  lineColor: colors.primaryActionColor,
  activePointColor: colors.primaryActionColor,

  endPointRadius: 4,
  animated: true,
};

const defaultTimeRangeConfig: TimeRangeSelectorConfig = {
  activeColor: colors.primaryActionColor,
  inactiveColor: colors.componentBackgroundColor,
  activeTextColor: colors.secondaryTextColor,
  inactiveTextColor: colors.Grey,
  justifyContent: 'center',
  marginBottom: margins.marginVerySmall,
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
