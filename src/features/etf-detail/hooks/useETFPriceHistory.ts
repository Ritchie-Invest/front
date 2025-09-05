import { useState, useEffect, useMemo } from 'react';
import { ETFPriceHistoryServiceAdapter } from '../adapters/ETFPriceHistoryServiceAdapter';
import { ETFPriceData } from '../models/ETFPriceData';

interface useETFPriceHistoryState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useETFPriceHistory = <T>(
  id: string,
  dateRange: string,
  dataService?: ETFPriceHistoryServiceAdapter,
) => {
  const service = useMemo(() => dataService || new ETFPriceHistoryServiceAdapter(), [dataService]);
  const [state, setState] = useState<useETFPriceHistoryState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data = await service.getETFWithPriceHistory(id, dateRange);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue',
      }));
    }
  };

  useEffect(() => {
    if (id && dateRange) {
      fetchData();
    }
  }, [id, dateRange, service]);

  return {
    ...state,
    refetch: fetchData,
  };
};

export const calculatePriceChange = (
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
