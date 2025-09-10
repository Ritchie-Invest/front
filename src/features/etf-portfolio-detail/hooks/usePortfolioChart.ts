import { useState, useEffect } from 'react';
import { PortfolioPosition } from '../models/PortfolioPosition';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import type { LineChartConfig } from '~/components/molecules/models/LineChart';
import { TimeRangeSelectorConfig } from '~/components/molecules/models/TimeRange';
import { PortfolioChartDataAdapter } from '../adapters/PortfolioChartDataAdapter';
import { PortfolioPositionsServiceAdapter } from '../adapters/PortfolioPositionsServiceAdapter';
import { colors } from '~/lib/theme/theme';

const portfolioChartAdapter = new PortfolioChartDataAdapter();
const portfolioDataService = new PortfolioPositionsServiceAdapter();

const defaultPortfolioChartConfig: LineChartConfig = {
  height: 240,
  lineColor: colors.successColor,
  activePointColor: colors.successColor,
  showVerticalLine: true,
  verticalLineColor: colors.successColor,
  endPointRadius: 4,
  animated: true,
};

const defaultTimeRangeConfig: TimeRangeSelectorConfig = {
  activeColor: colors.successColor,
  inactiveColor: colors.GreyL30,
  activeTextColor: colors.secondaryTextColor,
  inactiveTextColor: colors.secondaryTextColor,
  justifyContent: 'space-between',
  marginBottom: 4,
};

export const usePortfolioChart = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioPosition[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRangeType>(DateRangeType.OneMonth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await portfolioDataService.getPortfolioPositions(selectedRange);
      setPortfolioData(data);
    } catch (err) {
      setError('Erreur lors du chargement des données du portfolio');
      console.error('Error fetching portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, [selectedRange]);

  const handleRangeChange = (range: DateRangeType) => {
    setSelectedRange(range);
  };

  return {
    portfolioData,
    loading,
    error,
    selectedRange,
    handleRangeChange,
    adapter: portfolioChartAdapter,
    defaultConfig: defaultPortfolioChartConfig,
    defaultTimeRangeConfig,
  };
};
