import { LifeStatus, UserLifeResponse } from '../models/life';

export const validateLifeStatus = (data: any): data is LifeStatus => {
  return (
    typeof data === 'object' &&
    typeof data.livesRemaining === 'number' &&
    typeof data.nextLifeIn === 'number' &&
    typeof data.isOutOfLives === 'boolean' &&
    data.livesRemaining >= 0 &&
    data.nextLifeIn >= 0
  );
};

export const validateUserLifeResponse = (data: any): data is UserLifeResponse => {
  return (
    typeof data === 'object' &&
    typeof data.livesRemaining === 'number' &&
    typeof data.nextLifeIn === 'number' &&
    data.livesRemaining >= 0 &&
    data.nextLifeIn >= 0
  );
};

export const formatTimeRemaining = (milliseconds: number): string => {
  if (milliseconds <= 0) return '00:00';

  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
