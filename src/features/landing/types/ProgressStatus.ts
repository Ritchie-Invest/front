export enum ProgressStatus {
  LOCKED = 'LOCKED',
  CURRENT = 'CURRENT',
  COMPLETED = 'COMPLETED',
}

export type ProgressStatusType = keyof typeof ProgressStatus;
