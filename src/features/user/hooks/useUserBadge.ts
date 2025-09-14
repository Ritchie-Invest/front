import { useState, useMemo, useEffect, useCallback } from 'react';
import { UserBadgesServiceAdapter } from '../adapters/UserBadgesAdapter';
import { UserBadge } from '../models/userBadge';

const userBadgesAdapter = new UserBadgesServiceAdapter();

export const useUserBadges = () => {
  const [userBadges, setCurrentUserBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(() => userBadgesAdapter, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getUserBadges();
      if (data) {
        setCurrentUserBadges(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, [service, setCurrentUserBadges]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    userBadges,
    loading,
    error,
    refetch: fetchData,
  };
};
