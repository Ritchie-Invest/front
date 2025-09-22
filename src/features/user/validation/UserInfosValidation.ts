import { UserInfos } from '../models/userInfos';

export const USER_INFO_VALIDATION_RULES = {
  ID: {
    required: true,
    type: 'string',
    minLength: 1,
  },
  EMAIL: {
    required: true,
    type: 'string',
    minLength: 5,
    maxLength: 100,
  },
  TOTAL_XP: {
    required: true,
    type: 'number',
    min: 0,
  },
  LEVEL: {
    required: true,
    type: 'number',
    min: 0,
  },
  XP_REQUIRED_FOR_NEXT_LEVEL: {
    required: true,
    type: 'number',
    min: 0,
  },
  XP_FOR_THIS_LEVEL: {
    required: true,
    type: 'number',
    min: 0,
  },
  IS_INVESTMENT_UNLOCKED: {
    required: true,
    type: 'boolean',
  },
  LIFE: {
    required: true,
    type: 'number',
    min: 0,
  },
  NEXT_LIFE_IN: {
    required: true,
    type: 'number',
    min: 0,
  },
} as const;

export const validateUserId = (id: unknown): id is string => {
  return typeof id === 'string' && id.length > 0;
};

export const validateUserInfos = (userInfos: UserInfos): boolean => {
  if (!userInfos || typeof userInfos !== 'object') {
    return false;
  }

  const userInfosData = userInfos as any;

  const validations = {
    id: validateUserId(userInfosData.id),
    email:
      typeof userInfosData.email === 'string' &&
      userInfosData.email.length >= USER_INFO_VALIDATION_RULES.EMAIL.minLength &&
      userInfosData.email.length <= USER_INFO_VALIDATION_RULES.EMAIL.maxLength,
    totalXp: typeof userInfosData.totalXp === 'number' && userInfosData.totalXp >= 0,
    level: typeof userInfosData.level === 'number' && userInfosData.level >= 0,
    xpRequiredForNextLevel:
      typeof userInfosData.xpRequiredForNextLevel === 'number' &&
      userInfosData.xpRequiredForNextLevel >= 0,
    xpForThisLevel:
      typeof userInfosData.xpForThisLevel === 'number' && userInfosData.xpForThisLevel >= 0,
    isInvestmentUnlocked: typeof userInfosData.isInvestmentUnlocked === 'boolean',
    levelRequiredToUnlockInvestment:
      typeof userInfosData.levelRequiredToUnlockInvestment === 'number' &&
      userInfosData.levelRequiredToUnlockInvestment >= 0,
    life: typeof userInfosData.life === 'number' && userInfosData.life >= 0,
    nextLifeIn: typeof userInfosData.nextLifeIn === 'number' && userInfosData.nextLifeIn >= 0,
  };

  const isValid = Object.values(validations).every(Boolean);
  if (!isValid) {
  }

  return isValid;
};
