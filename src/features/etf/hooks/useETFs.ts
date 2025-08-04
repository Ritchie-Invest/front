import { useState, useEffect } from 'react';
import { ETFWithCurrentPrice } from '../models/ETFWithCurrentPrice';
import { ETFDataService } from '../contracts/ETFContract';
import { ETFServiceAdapter } from '../adapters/ETFServiceAdapter';

export const useETFs = (dataService: ETFDataService = new ETFServiceAdapter()) => {
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
