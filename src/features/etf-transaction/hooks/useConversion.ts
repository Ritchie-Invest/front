import { useState, useCallback, useMemo } from 'react';
import { ConversionServiceAdapter } from '../adapters/ConversionServiceAdapter';
import { useETFStore } from '~/features/etf/store/ETFStore';
import { useTransactionHistorytore } from '../store/TransactionStore';

export interface UseConversionReturn {
  amount: string;
  shares: number;
  setAmount: (value: string) => void;
  clearAmount: () => void;
  isValidAmount: boolean;
  selectedETF: any;
}

export const useConversion = (): UseConversionReturn => {
  const selectedETF = useETFStore((state) => state.selectedETF);
  const { amount, shares, setAmount: setStoreAmount, setShares } = useTransactionHistorytore();
  const conversionAdapter = new ConversionServiceAdapter();

  const setAmount = useCallback(
    (value: string) => {
      if (!value || typeof value !== 'string') {
        setStoreAmount('');
        setShares(0);
        return;
      }

      let cleanValue = value.replace(/[^0-9.]/g, '');

      const parts = cleanValue.split('.');
      if (parts.length > 2) {
        cleanValue = parts[0] + '.' + parts.slice(1).join('');
      }

      setStoreAmount(cleanValue);

      const numericValue = parseFloat(cleanValue);
      if (!isNaN(numericValue) && numericValue > 0 && selectedETF?.id) {
        const response = conversionAdapter.convertEuroToShares({
          euroAmount: numericValue,
          etfId: selectedETF.id,
        });
        setShares(response.shares);
      } else {
        setShares(0);
      }
    },
    [selectedETF?.id, setStoreAmount, setShares],
  );

  const clearAmount = useCallback(() => {
    setStoreAmount('');
    setShares(0);
  }, [setStoreAmount, setShares]);

  const isValidAmount = useMemo(() => {
    const isValid = !!(
      amount &&
      amount !== '' &&
      !isNaN(parseFloat(amount)) &&
      parseFloat(amount) > 0
    );
    return isValid;
  }, [amount]);

  return {
    amount,
    shares,
    setAmount,
    clearAmount,
    isValidAmount,
    selectedETF,
  };
};
