import { useState, useCallback } from 'react';
import { ConvertService } from '../services/ConversionService';
import { useETFStore } from '~/features/etf/store/ETFStore';

export interface UseConversionReturn {
  amount: number | '';
  shares: number;
  setAmount: (value: number) => void;
  clearAmount: () => void;
  isValidAmount: boolean;
  selectedETF: any;
}

export const useConversion = (): UseConversionReturn => {
  const [amount, setAmountState] = useState<number | ''>('');
  const [shares, setShares] = useState<number>(0);
  const selectedETF = useETFStore((state) => state.selectedETF);

  const setAmount = useCallback((value: number) => {
    setAmountState(value);

    if (!isNaN(value) && value > 0) {
      const response = ConvertService.convertEuroToShares({
        euroAmount: value,
        etfId: selectedETF?.id || '',
      });
      setShares(response.shares);
    } else {
      setShares(0);
    }
  }, []);

  const clearAmount = useCallback(() => {
    setAmountState('');
    setShares(0);
  }, []);

  const isValidAmount = useCallback(() => {
    if (!amount) return false;
    return !isNaN(amount) && amount > 0;
  }, [amount]);

  return {
    amount,
    shares,
    setAmount,
    clearAmount,
    isValidAmount: isValidAmount(),
    selectedETF: selectedETF,
  };
};
