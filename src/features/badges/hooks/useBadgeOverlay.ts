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

  const [dataVersion, setDataVersion] = useState(0);

  if (updateAdapterRef.current === null) {
    updateAdapterRef.current = new MarkBadgeAsSeenServiceAdapter();
  }

  useEffect(() => {
    const newQueue = unseen ? [...unseen] : [];
    unseenQueueRef.current = newQueue;

    setDataVersion((prev) => prev + 1);

    if (initialLoading) {
      setInitialLoading(false);
      console.debug('[useBadgeOverlay] | Hook UseEffect : Initial loading finished');
    }
  }, [unseen, initialLoading]);

  const BuildComponent = useCallback(async () => {
    let q = unseenQueueRef.current || [];
    console.debug(
      '[useBadgeOverlay] | Hook Build : BuildComponent called. Queue:',
      q,
      'DataVersion:',
      dataVersion,
    );

    if (unseen && unseen.length > 0 && (!q || q.length === 0)) {
      q = [...unseen];
      unseenQueueRef.current = q;
      console.debug('[useBadgeOverlay] | Hook Build : Queue was empty, refilled from unseen:', q);
    }

    if (q.length === 0) {
      console.debug('[useBadgeOverlay] | Hook Build : No badges to display');
      return { badge: undefined, anotherDisplay: false };
    }

    const first = q[0];
    console.debug(
      '[useBadgeOverlay] | Hook Build : Displaying badge:',
      first,
      'Another display:',
      q.length > 1,
    );
    return { badge: first, anotherDisplay: q.length > 1 };
  }, [unseen, dataVersion]);

  const handleBadgeButtonClick = useCallback(async (badgeType: any) => {
    setLoading(true);

    try {
      const adapter = updateAdapterRef.current!;
      await adapter.markBadgeAsSeen({ type: badgeType });
      if (unseenQueueRef.current && unseenQueueRef.current.length > 0) {
        unseenQueueRef.current.shift();
      }
      const next = unseenQueueRef.current.length > 0 ? unseenQueueRef.current[0] : undefined;
      const displayState = unseenQueueRef.current.length > 1;

      return { newBadge: next, displayState };
    } finally {
      setLoading(false);
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
