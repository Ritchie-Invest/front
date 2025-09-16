import { useState, useMemo, useEffect, useCallback } from 'react';
import { UserInfosServiceAdapter } from '../adapters/UserInfosServiceAdapter';
import { useUserInfosStore, useSetCurrentUserInfos } from '../store/UserInfosStore';

const userInfosAdapter = new UserInfosServiceAdapter();

export const useUserInfos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userInfos = useUserInfosStore((s) => s.currentUserInfos);
  const setCurrentUserInfos = useSetCurrentUserInfos();

  const service = useMemo(() => userInfosAdapter, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getUserInfos();
      if (data) {
        setCurrentUserInfos(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, [service, setCurrentUserInfos]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    userInfos,
    loading,
    error,
    refetch: fetchData,
  };
};
