export enum ProgressStatus {
  LOCKED = 'locked',
  CURRENT = 'current',
  COMPLETED = 'completed',
}

export enum GameType {
  MCQ = 'mcq',
  SENTENCES = 'sentences',
  MATCH = 'match',
  TRUE_OR_FALSE = 'trueOrFalse',
  GAUGE = 'gauge',
  ORDER = 'order',
}

export const getPublishStatus = (isPublished: boolean): 'published' | 'draft' => {
  return isPublished ? 'published' : 'draft';
};

export const isPublished = (status: 'published' | 'draft'): boolean => {
  return status === 'published';
};
