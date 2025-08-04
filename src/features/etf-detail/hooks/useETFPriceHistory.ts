import { useState, useEffect } from 'react';
import { ETFDataService } from '../index';

interface useETFPriceHistoryState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useETFPriceHistory = <T>(
  etfId: number,
  dateRange: string,
  dataService: ETFDataService,
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
  }, [etfId, dateRange]);

  return {
    ...state,
    refetch: fetchData,
  };
};
