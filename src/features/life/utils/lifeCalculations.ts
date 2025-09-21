import { LifeStatus } from '../models/life';

const canRegenerateLife = (livesRemaining: number, maxLives: number): boolean => {
  return livesRemaining < maxLives;
};

const calculateNextRegenTimer = (
  livesRemaining: number,
  maxLives: number,
  regenTime: number,
): number => {
  return livesRemaining < maxLives ? regenTime : 0;
};

export const regenerateLife = (
  currentStatus: LifeStatus,
  maxLives: number,
  regenTime: number,
): LifeStatus => {
  if (!canRegenerateLife(currentStatus.livesRemaining, maxLives)) {
    return currentStatus;
  }

  const newLivesRemaining = currentStatus.livesRemaining + 1;

  return {
    livesRemaining: newLivesRemaining,
    nextLifeIn: calculateNextRegenTimer(newLivesRemaining, maxLives, regenTime),
    isOutOfLives: false,
  };
};

export const decrementTimer = (currentTimer: number, interval: number = 1000): number => {
  return Math.max(0, currentTimer - interval);
};
