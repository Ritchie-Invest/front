import { create } from 'zustand';
import { LifeStatus } from '../models/life';
import { userInfosService } from '../../user/services/UserInfosService';
import { validateLifeStatus } from '../validation/lifeValidation';
import { decrementTimer, regenerateLife } from '../utils/lifeCalculations';
import { config } from '~/lib/config';

export interface LifeState {
  lifeStatus: LifeStatus;
  loading: boolean;
  error: string | null;
  maxLives: number;
  regenTime: number;

  setLifeStatus: (status: LifeStatus) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateConfig: (maxLives: number, regenTime: number) => void;
  refreshLifeStatus: () => Promise<void>;
  decrementTimer: () => void;
}

export const useLifeStore = create<LifeState>((set, get) => ({
  lifeStatus: {
    livesRemaining: config.MAX_LIVES,
    nextLifeIn: 0,
    isOutOfLives: false,
  },
  loading: true,
  error: null,
  maxLives: config.MAX_LIVES,
  regenTime: config.LIFE_REGENERATION_TIME_MS,

  setLifeStatus: (status: LifeStatus) => set({ lifeStatus: status }),

  setLoading: (loading: boolean) => set({ loading }),

  setError: (error: string | null) => set({ error }),

  updateConfig: (maxLives: number, regenTime: number) => set({ maxLives, regenTime }),

  refreshLifeStatus: async () => {
    const { setLifeStatus, setLoading, setError, updateConfig } = get();

    try {
      setLoading(true);
      const userInfos = await userInfosService.getUserInfos();
      const response = {
        livesRemaining: userInfos.life,
        nextLifeIn: userInfos.nextLifeIn,
      };

      const state = get();
      let newMaxLives = state.maxLives;
      let newRegenTime = state.regenTime;

      if (response.livesRemaining > config.MAX_LIVES) {
        newMaxLives = response.livesRemaining;
      }

      if (state.regenTime === config.LIFE_REGENERATION_TIME_MS && response.nextLifeIn > 0) {
        newRegenTime = response.nextLifeIn;
      }

      updateConfig(newMaxLives, newRegenTime);

      const newLifeStatus: LifeStatus = {
        livesRemaining: response.livesRemaining,
        nextLifeIn: response.nextLifeIn,
        isOutOfLives: response.livesRemaining <= 0,
      };

      if (!validateLifeStatus(newLifeStatus)) {
        throw new Error('Invalid life status data');
      }

      setLifeStatus(newLifeStatus);
      setError(null);
    } catch (err) {
      setError('Failed to load life status');
    } finally {
      setLoading(false);
    }
  },

  decrementTimer: () => {
    const { lifeStatus, maxLives, regenTime, setLifeStatus } = get();

    if (lifeStatus.nextLifeIn <= 0) return;

    const newTimer = decrementTimer(lifeStatus.nextLifeIn);

    if (newTimer === 0) {
      const regeneratedStatus = regenerateLife(lifeStatus, maxLives, regenTime);
      setLifeStatus(regeneratedStatus);
    } else {
      setLifeStatus({
        ...lifeStatus,
        nextLifeIn: newTimer,
      });
    }
  },
}));
