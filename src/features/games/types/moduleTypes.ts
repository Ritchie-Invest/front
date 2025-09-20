export const MODULE_TYPES = {
  MCQ: 'MCQ',
  TRUE_OR_FALSE: 'TRUE_OR_FALSE',
  FILL_IN_THE_BLANK: 'FILL_IN_THE_BLANK',
} as const;

export type ModuleType = (typeof MODULE_TYPES)[keyof typeof MODULE_TYPES];
