import { useMemo } from 'react';
import { useETFStore } from '~/features/etf/store/ETFStore';

export interface UseConversionReturn {
  shares: number;
  isValidAmount: boolean;
  selectedETF: any;
}

export const useConversion = (amount: number): UseConversionReturn => {
  const selectedETF = useETFStore((state) => state.selectedETF);

  const shares = useMemo(() => {
    if (!amount || !selectedETF?.id || !selectedETF?.currentPrice) return 0;

    if (isNaN(amount) || amount <= 0) return 0;

    return amount / selectedETF.currentPrice;
  }, [amount, selectedETF?.id, selectedETF?.currentPrice]);

  const isValidAmount = useMemo(() => {
    return !!(amount && !isNaN(amount) && amount > 0);
  }, [amount]);

  return {
    shares,
    isValidAmount,
    selectedETF,
  };
};
