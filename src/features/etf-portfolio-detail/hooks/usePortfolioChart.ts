import { useState, useEffect } from 'react';
import { PortfolioPosition } from '../models/PortfolioPosition';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import type { LineChartConfig } from '~/components/molecules/models/LineChart';
import { TimeRangeSelectorConfig } from '~/components/molecules/models/TimeRange';
import { PortfolioPositionsServiceAdapter } from '../adapters/PortfolioPositionsServiceAdapter';
import { PortfolioCashChartDataAdapter } from '../adapters/PortfolioCashChartDataAdapter';
import { PortfolioInvestmentsChartDataAdapter } from '../adapters/PortfolioInvestmentsChartDataAdapter';
import { colors, margins } from '~/lib/theme/theme';
import { useMemo, useCallback } from 'react';

const portfolioCashChartAdapter = new PortfolioCashChartDataAdapter();
const portfolioInvestmentsAdapter = new PortfolioInvestmentsChartDataAdapter();
const portfolioDataService = new PortfolioPositionsServiceAdapter();

const defaultPortfolioLineChartConfig: LineChartConfig = {
  height: 240,
  lineColor: colors.primaryActionColor,
  activePointColor: colors.primaryActionColor,
  showVerticalLine: true,
  verticalLineColor: colors.primaryActionColor,
  endPointRadius: 4,
  animated: true,
};

const defaultTimeRangeConfig: TimeRangeSelectorConfig = {
  activeColor: colors.warningColor,
  inactiveColor: colors.componentBackgroundColor,
  activeTextColor: colors.secondaryTextColor,
  inactiveTextColor: colors.Grey,
  justifyContent: 'center',
  marginBottom: margins.marginVerySmall,
};

export const usePortfolioChart = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioPosition[]>([]);
  const [variation, setVariation] = useState<number>(0);
  const [variationPercent, setVariationPercent] = useState<number>(0);
  const [variationDirection, setVariationDirection] = useState<string>('FLAT');
  const [selectedRange, setSelectedRange] = useState<DateRangeType>(DateRangeType.OneMonth);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await portfolioDataService.getPortfolioPositions(selectedRange);
      setPortfolioData(res.positions);
      setVariation(res.variation ?? 0);
      setVariationPercent(res.variationPercent ?? 0);
      setVariationDirection(res.variationDirection ?? 'FLAT');
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

  const handleRangeChange = useCallback((range: DateRangeType) => {
    setSelectedRange(range);
  }, []);

  const seriesLabels = useMemo(() => ['Liquidités', 'Investissements'], []);

  return useMemo(
    () => ({
      portfolioData,
      loading,
      error,
      selectedRange,
      handleRangeChange,
      adapter: portfolioCashChartAdapter,
      adapter2: portfolioInvestmentsAdapter,
      data2: portfolioData,
      variation,
      variationPercent,
      variationDirection,
      defaultConfig: defaultPortfolioLineChartConfig,
      defaultTimeRangeConfig,
      seriesLabels,
    }),
    [
      portfolioData,
      loading,
      error,
      selectedRange,
      variation,
      variationPercent,
      variationDirection,
      seriesLabels,
    ],
  );
};
