import { ProgressStatus } from '../types/ProgressStatus';

export const computeProgressStatus = (
  isUnlocked: boolean,
  completedCount: number,
  totalCount: number,
): ProgressStatus => {
  if (!isUnlocked) return ProgressStatus.LOCKED;
  if (completedCount === totalCount) return ProgressStatus.COMPLETED;
  return ProgressStatus.CURRENT;
};
