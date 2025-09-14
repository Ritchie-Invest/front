import { useState, useMemo, useEffect, useCallback } from 'react';
import { GetBadgesServiceAdapter } from '../adapter/GetBadgesServiceAdapter';
import { Badge } from '../models/Badge';
import { BadgeStore } from '../store/BadgeStore';

const BadgesAdapter = new GetBadgesServiceAdapter();

export const useGetBadges = () => {
  const [Badges, setCurrentBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const service = useMemo(() => BadgesAdapter, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getBadges();
      if (data) {
        setCurrentBadges(data);
        try {
          const seenAwarded = data
            .filter((b) => b.awardedAt !== null && b.hasSeen === true)
            .map((b) => ({ ...b, awardedAtDate: new Date(b.awardedAt as any) }))
            .sort((a, b) => b.awardedAtDate.getTime() - a.awardedAtDate.getTime());

          if (seenAwarded.length > 0) {
            const setBadges = BadgeStore.getState().setBadges;
            setBadges(seenAwarded);
          }

          try {
            const unseenAwarded = data
              .filter((b) => b.awardedAt !== null && b.hasSeen === false)
              .map((b) => ({ ...b, awardedAtDate: new Date(b.awardedAt as any) }))
              .sort((a, b) => b.awardedAtDate.getTime() - a.awardedAtDate.getTime());

            if (unseenAwarded.length > 0) {
              const setNewBadges = BadgeStore.getState().setNewBadges;
              setNewBadges(unseenAwarded);
            }
          } catch (e) {}
        } catch (e) {}
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, [service, setCurrentBadges]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    Badges,
    loading,
    error,
    refetch: fetchData,
  };
};
