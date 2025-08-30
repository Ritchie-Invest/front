import { useMemo } from 'react';
import { calculatePriceChange } from './useETFPriceHistory';
import { useETFStaticData, useETFData, useETFLoading, useETFError } from '../store/ETFDetailStore';

export const useETFDetail = () => {
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
