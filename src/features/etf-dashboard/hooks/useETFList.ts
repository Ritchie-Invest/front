import { useState, useEffect } from 'react';
import { ETFWithCurrentPrice } from '../../etf/models/ETFWithCurrentPrice';
import { ETFListContract } from '../contracts/ETFListContract';
import { ETFListServiceAdapter } from '../adapters/ETFListServiceAdapter';

export const useETFList = (dataService: ETFListContract = new ETFListServiceAdapter()) => {
  const [etfs, setETFs] = useState<ETFWithCurrentPrice[]>([]);
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
