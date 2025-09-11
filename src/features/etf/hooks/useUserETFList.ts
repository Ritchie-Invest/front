import { useState, useEffect } from 'react';
import { UserPossessedETF } from '~/features/etf/models/UserPossessedETF';
import { UserETFListContract } from '../contracts/UserETFListContract';
import { UserETFListServiceAdapter } from '../adapters/UserETFListServiceAdapter';

export const useUserETFList = (
  dataService: UserETFListContract = new UserETFListServiceAdapter(),
) => {
  const [etfs, setETFs] = useState<UserPossessedETF[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchETFs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dataService.getAllUserETFs();
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
    hasError: error !== null,
    hasNoETFs: etfs.length === 0,
  };
};
