import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Badge } from '../models/Badge';

interface BadgeStoreState {
  newBadges: Badge[];
  badges: Badge[];
  setBadges: (badges: Badge[]) => void;
  addBadge: (badge: Badge) => void;
  setNewBadges: (newBadges: Badge[]) => void;
  popNewBadge: () => void;
  clearBadgeStore: () => void;
  confirmNextBadge: () => void;
}

export const BadgeStore = create<BadgeStoreState>()(
  // @ts-ignore
  subscribeWithSelector((set, get) => ({
    badges: [],
    newBadges: [],

    setBadges: (badges: Badge[]) => {
      set({ badges });
    },

    setNewBadges: (newBadges: Badge[]) => {
      set({ newBadges });
    },

    addBadge: (badge: Badge) => {
      const next = [...(get().badges || []), badge];
      set({ badges: next });
    },

    popNewBadge: () => {
      const current = get().newBadges || [];
      const [, ...rest] = current;
      set({ newBadges: rest });
    },

    clearBadgeStore: () => {
      set({ badges: [], newBadges: [] });
    },

    confirmNextBadge: () => {
      const currentNewBadges = get().newBadges || [];
      const currentBadges = get().badges || [];
      if (currentNewBadges.length === 0) return;

      const [next, ...rest] = currentNewBadges;
      const updatedBadges = [...currentBadges, next];
      set({ badges: updatedBadges, newBadges: rest });
    },
  })),
);

export const SetBadges = () => BadgeStore((state) => state.setBadges);
export const SetNewBadges = () => BadgeStore((state) => state.setNewBadges);

export const useGetBadges = () => BadgeStore((state) => state.badges);
export const useNewBadges = () => BadgeStore((state) => state.newBadges);

export const addBadge = () => BadgeStore((state) => state.addBadge);
export const PopNewBadge = () => BadgeStore((state) => state.popNewBadge);

export const ClearBadgeStore = () => BadgeStore((state) => state.clearBadgeStore);
