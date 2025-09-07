import { useState, useEffect } from 'react';
import { ETF } from '../../etf/models/ETF';
import { ETFListContract } from '../contracts/ETFListContract';
import { ETFListServiceAdapter } from '../adapters/ETFListServiceAdapter';

export const useETFs = (dataService: ETFListContract = new ETFListServiceAdapter()) => {
  const [etfs, setETFs] = useState<ETF[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchETFs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dataService.getAllETFs();
      setETFs(data);
    } catch (err) {
      setError('Failed to fetch ETFs');
      console.error('Error fetching ETFs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchETFs();
  }, []);

  return {
    etfs,
    loading,
    error,
    refetch: fetchETFs,
  };
};
