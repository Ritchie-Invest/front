import { useState, useEffect } from 'react';
import { ETFPriceHistoryServiceAdapter } from '../adapters/ETFPriceHistoryServiceAdapter';

interface useETFPriceHistoryState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useETFPriceHistory = <T>(
  etfId: string,
  dateRange: string,
  dataService: ETFPriceHistoryServiceAdapter = new ETFPriceHistoryServiceAdapter(),
) => {
  const [state, setState] = useState<useETFPriceHistoryState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data = await dataService.getETFWithPriceHistory(etfId, dateRange);
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
    fetchData();
  }, [etfId, dateRange, dataService]);

  return {
    ...state,
    refetch: fetchData,
  };
};
