import { useMemo } from 'react';
import { useETFStaticData, useETFData, useETFLoading, useETFError } from '../store/ETFDetailStore';
import { ETFPriceData } from '~/features/etf/models/ETFPriceData';

const calculatePriceChange = (
  priceHistory: ETFPriceData[],
): { amount: number; percentage: number } => {
  if (priceHistory.length < 2) {
    return { amount: 0, percentage: 0 };
  }

  const firstPrice = priceHistory[0].close;
  const lastPrice = priceHistory[priceHistory.length - 1].close;
  const amount = lastPrice - firstPrice;
  const percentage = (amount / firstPrice) * 100;

  return { amount, percentage };
};

export const useETFPriceHistory = () => {
  const staticData = useETFStaticData();
  const etfData = useETFData();
  const loading = useETFLoading();
  const error = useETFError();

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
