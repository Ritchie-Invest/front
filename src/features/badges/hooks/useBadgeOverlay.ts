import { useState, useCallback, useRef, useEffect } from 'react';
import { MarkBadgeAsSeenServiceAdapter } from '../adapter/MarkBadgeAsSeenServiceAdapter';
import { useGetBadges } from './useGetBadges';
import { Badge } from '../models/Badge';

export const useBadgeOverlay = () => {
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const { unseen } = useGetBadges();

  const unseenQueueRef = useRef<Badge[]>([]);
  const updateAdapterRef = useRef<MarkBadgeAsSeenServiceAdapter | null>(null);

  if (updateAdapterRef.current === null) {
    updateAdapterRef.current = new MarkBadgeAsSeenServiceAdapter();
    console.debug('[useBadgeOverlay] Created MarkBadgeAsSeenServiceAdapter');
  }

  useEffect(() => {
    unseenQueueRef.current = unseen ? [...unseen] : [];
    console.debug('[useBadgeOverlay] unseen updated:', unseenQueueRef.current);
    if (initialLoading) {
      setInitialLoading(false);
      console.debug('[useBadgeOverlay] Initial loading finished');
    }
  }, [unseen, initialLoading]);

  const BuildComponent = useCallback(async () => {
    let q = unseenQueueRef.current || [];
    console.debug('[useBadgeOverlay] BuildComponent called. Queue:', q);

    if ((!q || q.length === 0) && unseen && unseen.length > 0) {
      q = [...unseen];
      unseenQueueRef.current = q;
      console.debug('[useBadgeOverlay] Queue was empty, refilled from unseen:', q);
    }
    if (q.length === 0) {
      console.debug('[useBadgeOverlay] No badges to display');
      return { badge: undefined, anotherDisplay: false };
    }
    const first = q[0];
    console.debug('[useBadgeOverlay] Displaying badge:', first, 'Another display:', q.length > 1);
    return { badge: first, anotherDisplay: q.length > 1 };
  }, [unseen]);

  const handleBadgeButtonClick = useCallback(async (badgeType: any) => {
    setLoading(true);
    console.debug('[useBadgeOverlay] handleBadgeButtonClick called with:', badgeType);
    try {
      const adapter = updateAdapterRef.current!;
      await adapter.markBadgeAsSeen({ type: badgeType });
      if (unseenQueueRef.current && unseenQueueRef.current.length > 0) {
        unseenQueueRef.current.shift();
        console.debug(
          '[useBadgeOverlay] Badge marked as seen and removed from queue. New queue:',
          unseenQueueRef.current,
        );
      }
      const next = unseenQueueRef.current.length > 0 ? unseenQueueRef.current[0] : undefined;
      const displayState = unseenQueueRef.current.length > 1;
      console.debug('[useBadgeOverlay] Next badge:', next, 'Display state:', displayState);
      return { newBadge: next, displayState };
    } finally {
      setLoading(false);
      console.debug('[useBadgeOverlay] Loading set to false');
    }
  }, []);

  return {
    BuildComponent,
    handleBadgeButtonClick,
    loading,
    initialLoading,
  };
};

export default useBadgeOverlay;
