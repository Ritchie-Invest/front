import { useState, useMemo, useEffect, useCallback } from 'react';
import { GetBadgesServiceAdapter } from '../adapter/GetBadgesServiceAdapter';
import { Badge } from '../models/Badge';
import { BadgeStore } from '../store/BadgeStore';

const BadgesAdapter = new GetBadgesServiceAdapter();

export const useGetBadges = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seen, setSeen] = useState<Badge[]>([]);
  const [unseen, setUnseen] = useState<Badge[]>([]);
  const [locked, setLocked] = useState<Badge[]>([]);

  const service = useMemo(() => BadgesAdapter, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await service.getBadges();

      if (data) {
        try {
          const Awarded = data
            .filter((b) => b.awardedAt !== null)
            .map((b) => ({ ...b, awardedAtDate: new Date(b.awardedAt as any) }))
            .sort((a, b) => b.awardedAtDate.getTime() - a.awardedAtDate.getTime());

          if (Awarded.length > 0) {
            const setBadges = BadgeStore.getState().setBadges;
            setBadges(Awarded);
          }

          const seenBadges = Awarded.filter((b) => b.hasSeen);
          const unseenBadges = Awarded.filter((b) => !b.hasSeen);
          setSeen(seenBadges);
          setUnseen(unseenBadges);

          try {
            const lockedBadges = data.filter((b) => b.awardedAt === null).map((b) => ({ ...b }));

            if (lockedBadges.length > 0) {
              const setLocked = BadgeStore.getState().setLockedBadges;
              setLocked(lockedBadges);
            }
            setLocked(lockedBadges);
          } catch (e) {
            console.error('[useGetBadges] | Data hook : Error processing locked badges:', e);
          }
        } catch (e) {
          console.error('[useGetBadges] | Data hook : Error processing Awarded:', e);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.error('[useGetBadges] | Data hook : Error fetching badges:', err);
    } finally {
      setLoading(false);
    }
  }, [service]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    error,
    refetch: fetchData,
    seen,
    unseen,
    locked,
  };
};
