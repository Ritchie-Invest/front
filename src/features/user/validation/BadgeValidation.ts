import { UserBadge } from '../models/userBadge';
import { BadgeType } from '../types/BadgeType';

export const USER_BADGE_VALIDATION_RULES = {
  TYPE: {
    required: true,
    type: BadgeType,
    minLength: 1,
  },
  NAME: {
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 100,
  },
  DESCRIPTION: {
    required: true,
    type: 'string',
    minLength: 5,
    maxLength: 500,
  },
  ICON: {
    required: true,
    type: 'string',
    minLength: 5,
    maxLength: 100,
  },
  AWARDED_AT: {
    required: false,
    type: 'date',
  },
} as const;

export const validateUserBadge = (badge: UserBadge): boolean => {
  if (!badge || typeof badge !== 'object') {
    return false;
  }

  const badgeData = badge as any;

  const validations = {
    type:
      typeof badgeData.type === 'string' &&
      badgeData.type.length > 0 &&
      Object.values(BadgeType).includes(badgeData.type),
    name:
      typeof badgeData.name === 'string' &&
      badgeData.name.length >= USER_BADGE_VALIDATION_RULES.NAME.minLength &&
      badgeData.name.length <= USER_BADGE_VALIDATION_RULES.NAME.maxLength,
    description:
      typeof badgeData.description === 'string' &&
      badgeData.description.length >= USER_BADGE_VALIDATION_RULES.DESCRIPTION.minLength &&
      badgeData.description.length <= USER_BADGE_VALIDATION_RULES.DESCRIPTION.maxLength,
    icon:
      typeof badgeData.icon === 'string' &&
      badgeData.icon.length >= USER_BADGE_VALIDATION_RULES.ICON.minLength &&
      badgeData.icon.length <= USER_BADGE_VALIDATION_RULES.ICON.maxLength,
    awardedAt: badgeData.awardedAt instanceof Date || badgeData.awardedAt === null,
  };

  return Object.values(validations).every(Boolean);
};
