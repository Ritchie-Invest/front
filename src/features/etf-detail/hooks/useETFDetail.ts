import { useMemo } from 'react';
import { useETFPriceHistory, calculatePriceChange } from './useETFPriceHistory';
import { useETFDetailStore } from '../store/ETFDetailStore';
import { ETFWithPriceHistory } from '../models/ETFPriceHistory';

export const useETFDetail = () => {
  const { id, selectedRange } = useETFDetailStore();
  const {
    data: etfData,
    loading,
    error,
  } = useETFPriceHistory<ETFWithPriceHistory>(id || '', selectedRange);

  const staticData = useMemo(() => {
    if (!etfData) return null;
    return {
      ticker: etfData.ticker,
      name: etfData.name,
      currentPrice: etfData.currentPrice,
    };
  }, [etfData]);

  const priceChange = useMemo(() => {
    if (!etfData?.priceHistory) return { amount: 0, percentage: 0 };
    return calculatePriceChange(etfData.priceHistory);
  }, [etfData?.priceHistory]);

  const isPositive = priceChange.percentage >= 0;
  const staticLoading = loading && !staticData;
  const dynamicLoading = loading && !!staticData;

  return {
    staticLoading,
    dynamicLoading,
    error,
    staticData,
    priceChange,
    isPositive,
  };
};
