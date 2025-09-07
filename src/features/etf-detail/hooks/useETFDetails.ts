import { useMemo } from 'react';
import { useSelectedETF } from '~/features/etf/store/ETFStore';
import { useETFChart } from './useETFChart';

export const useETFDetails = () => {
  const selectedETF = useSelectedETF();
  const { variation, variationPercent, variationDirection, loading, error } = useETFChart();

  const isPositive = useMemo(() => {
    return variationPercent >= 0;
  }, [variationPercent]);

  const staticLoading = loading && !selectedETF;
  const dynamicLoading = loading && !!selectedETF;

  return {
    staticLoading,
    dynamicLoading,
    error,

    staticData: selectedETF,

    variation,
    variationPercent,
    variationDirection,
    isPositive,
  };
};
