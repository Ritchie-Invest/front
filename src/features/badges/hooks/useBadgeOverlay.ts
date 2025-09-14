import { useState } from 'react';
import { BadgeStore } from '../store/BadgeStore';
import { PostBadgeConfirmationServiceAdapter } from '../adapter/PostBadgeConfirmationServiceAdapter';

export const useBadgeOverlay = ({ onResetAnimations }: { onResetAnimations?: () => void } = {}) => {
  const [loading, setLoading] = useState(false);

  const postAdapter = new PostBadgeConfirmationServiceAdapter();

  const confirmNext = async (badgeType: any) => {
    setLoading(true);
    try {
      await postAdapter.postBadgeConfirmation({ type: badgeType });

      BadgeStore.getState().confirmNextBadge();

      if (onResetAnimations) onResetAnimations();

      return true;
    } catch (err) {
      console.error('useBadgeButton: failed to confirm badge', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const newBadges = BadgeStore((s) => s.newBadges);

  const badge = newBadges && newBadges.length > 0 ? newBadges[0] : null;

  const handleConfirmNext = async () => {
    if (!badge) return false;
    return confirmNext(badge.type);
  };

  const handleClose = async () => {
    if (badge) {
      try {
        await confirmNext(badge.type);
      } catch (err) {
        console.error('useBadgeOverlay: failed to confirm badge on close', err);
      }
    }

    const setNewBadges = BadgeStore.getState().setNewBadges;
    if (setNewBadges) setNewBadges([]);
    return true;
  };

  return {
    badge,
    newBadges,
    queueLength: newBadges ? newBadges.length : 0,
    handleConfirmNext,
    handleClose,
    confirmNext,
    loading,
  };
};

export default useBadgeOverlay;
