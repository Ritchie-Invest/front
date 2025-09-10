import { useMemo } from 'react';
import { useSelectedETF } from '~/features/etf/store/ETFStore';
import { useETFChart } from '~/features/etf-detail/hooks/useETFChart';
import { useRoute } from '@react-navigation/native';

export const useETFDetails = () => {
  const selectedETF = useSelectedETF();
  const route = useRoute();
  let variation: number | undefined;
  let variationPercent: number | undefined;
  let variationDirection: string | undefined;
  let loading: boolean | undefined;
  let error: any;
  let isPositive: boolean | undefined;

  if (route.name === 'ETFDetails') {
    ({ variation, variationPercent, variationDirection, loading, error } = useETFChart());
    isPositive = useMemo(() => {
      return variationPercent !== undefined ? variationPercent >= 0 : undefined;
    }, [variationPercent]);
  }

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
