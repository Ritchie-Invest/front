import { useState, useEffect, useMemo } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import {
  useSelectedETF,
  useSetSelectedETF,
  useSelectedRange,
  useSetSelectedRange,
} from '~/features/etf/store/ETFStore';
import { ETFPriceHistoryServiceAdapter } from '../adapters/ETFPriceHistoryServiceAdapter';
import { ETFWithPriceHistory } from '../models/ETFPriceHistory';
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

export const useETFChart = (dataService?: ETFPriceHistoryServiceAdapter) => {
  const selectedRange = useSelectedRange();
  const setSelectedRange = useSetSelectedRange();
  const setSelectedETF = useSetSelectedETF();
  const [priceHistory, setPriceHistory] = useState<ETFWithPriceHistory | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(() => dataService || new ETFPriceHistoryServiceAdapter(), [dataService]);
  const selectedETF = useSelectedETF();

  const fetchData = async () => {
    if (!selectedETF?.id) {
      setError('Aucun ETF sélectionné');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await service.getETFWithPriceHistory(selectedETF.id, selectedRange);
      setPriceHistory(data);
      setSelectedETF({
        ...selectedETF,
        variation: data.variation,
        variationPercent: data.variationPercent,
        variationDirection: data.variationDirection,
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedETF?.id && selectedRange) {
      fetchData();
    }
  }, [selectedETF?.id, selectedRange, service]);

  const handleRangeChange = (range: DateRangeType) => {
    setSelectedRange(range);
  };

  return {
    priceHistory: priceHistory?.history || [],
    variation: priceHistory?.variation || 0,
    variationPercent: priceHistory?.variationPercent || 0,
    variationDirection: priceHistory?.variationDirection,

    loading,
    error,
    selectedRange,

    handleRangeChange,
    refetch: fetchData,

    adapter: etfChartAdapter,
    defaultConfig: defaultEtfChartConfig,
    defaultTimeRangeConfig,
  };
};
