// Enum pour les statuts de progression
export enum ProgressStatus {
  LOCKED = 'locked',
  CURRENT = 'current',
  COMPLETED = 'completed',
}

// Enum pour les types de jeux
export enum GameType {
  QCM = 'qcm',
  SENTENCES = 'sentences',
  MATCH = 'match',
  TRUE_OR_FALSE = 'trueOrFalse',
  GAUGE = 'gauge',
  ORDER = 'order',
}

// Helpers pour convertir isPublished en statut d'affichage
export const getPublishStatus = (isPublished: boolean): 'published' | 'draft' => {
  return isPublished ? 'published' : 'draft';
};

export const isPublished = (status: 'published' | 'draft'): boolean => {
  return status === 'published';
};
