import { useState, useCallback } from 'react';
import { ConvertService } from '../services/ConversionService';
import { useETFStore } from '~/features/etf/store/ETFStore';

export interface UseConversionReturn {
  amount: string;
  shares: number;
  setAmount: (value: string) => void;
  clearAmount: () => void;
  isValidAmount: boolean;
  selectedETF: any;
}

export const useConversion = (): UseConversionReturn => {
  const [amount, setAmountState] = useState<string>('');
  const [shares, setShares] = useState<number>(0);
  const selectedETF = useETFStore((state) => state.selectedETF);

  const setAmount = useCallback(
    (value: string) => {
      if (!value || typeof value !== 'string') {
        setAmountState('');
        setShares(0);
        return;
      }

      let cleanValue = value.replace(/[^0-9.]/g, '');

      const parts = cleanValue.split('.');
      if (parts.length > 2) {
        cleanValue = parts[0] + '.' + parts.slice(1).join('');
      }

      setAmountState(cleanValue);

      const numericValue = parseFloat(cleanValue);
      if (!isNaN(numericValue) && numericValue > 0 && selectedETF?.id) {
        const response = ConvertService.convertEuroToShares({
          euroAmount: numericValue,
          etfId: selectedETF.id,
        });
        setShares(response.shares);
      } else {
        setShares(0);
      }
    },
    [selectedETF?.id],
  );

  const clearAmount = useCallback(() => {
    setAmountState('');
    setShares(0);
  }, []);

  const isValidAmount = useCallback(() => {
    if (!amount || amount === '') return false;
    const numericValue = parseFloat(amount);
    return !isNaN(numericValue) && numericValue > 0;
  }, [amount]);

  return {
    amount,
    shares,
    setAmount,
    clearAmount,
    isValidAmount: isValidAmount(),
    selectedETF,
  };
};
