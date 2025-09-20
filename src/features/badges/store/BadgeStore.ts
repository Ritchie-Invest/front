import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Badge } from '../models/Badge';

interface BadgeStoreState {
  newBadges: Badge[];
  badges: Badge[];
  lockedBadges: Badge[];
  setBadges: (badges: Badge[]) => void;
  addBadge: (badge: Badge) => void;
  setNewBadges: (newBadges: Badge[]) => void;
  setLockedBadges: (locked: Badge[]) => void;
  popNewBadge: () => void;
  clearBadgeStore: () => void;
  confirmNextBadge: () => void;
}

export const BadgeStore = create<BadgeStoreState>()(
  // @ts-ignore
  subscribeWithSelector((set, get) => ({
    badges: [],
    newBadges: [],
    lockedBadges: [],

    setBadges: (badges: Badge[]) => {
      set({ badges });
    },

    setLockedBadges: (locked: Badge[]) => {
      set({ lockedBadges: locked });
    },

    clearBadgeStore: () => {
      set({ badges: [], newBadges: [], lockedBadges: [] });
    },
  })),
);

export const SetBadges = () => BadgeStore((state) => state.setBadges);
export const SetLockedBadges = () => BadgeStore((state) => state.setLockedBadges);

export const useGetBadges = () => BadgeStore((state) => state.badges);
export const useLockedBadges = () => BadgeStore((state) => state.lockedBadges);

export const ClearBadgeStore = () => BadgeStore((state) => state.clearBadgeStore);
