import { useState, useEffect } from 'react';
import { Portfolio } from '../../etf-portfolio/models/portfolio';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import type { LineChartConfig } from '~/components/molecules/models/LineChart';
import { TimeRangeSelectorConfig } from '~/components/molecules/models/TimeRange';
import { PortfolioChartDataAdapter } from '../adapters/PortfolioChartDataAdapter';
import { PortfolioPositionsServiceAdapter } from '../adapters/PortfolioChartAdapter.ts';

const portfolioChartAdapter = new PortfolioChartDataAdapter();
const portfolioDataService = new PortfolioPositionsServiceAdapter();

const defaultPortfolioChartConfig: LineChartConfig = {
  height: 240,
  lineColor: '#10B981',
  activePointColor: '#10B981',
  showVerticalLine: true,
  verticalLineColor: '#E5E7EB',
  endPointRadius: 4,
  animated: true,
};

const defaultTimeRangeConfig: TimeRangeSelectorConfig = {
  activeColor: 'green.500',
  inactiveColor: 'gray.100',
  activeTextColor: 'white',
  inactiveTextColor: 'gray.700',
  justifyContent: 'center',
  marginBottom: 4,
};

export const usePortfolioChart = () => {
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]);
  const [selectedRange, setSelectedRange] = useState<DateRangeType>(DateRangeType.OneMonth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await portfolioDataService.getPortfolioValues();
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
