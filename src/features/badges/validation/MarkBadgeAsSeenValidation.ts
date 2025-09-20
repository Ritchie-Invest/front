import { BadgeConfirmationRequest, BadgeConfirmationResponse } from '../models/BadgeConfirmation';
import { BadgeType } from '../types/BadgeType';

export const BADGE_CONFIRMATION_REQUEST_RULES = {
  TYPE: {
    required: true,
    type: BadgeType,
    minLength: 1,
  },
} as const;

export const BADGE_CONFIRMATION_RESPONSE_RULES = {
  STATUS: {
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 100,
  },
} as const;

export const validateRequest = (request: BadgeConfirmationRequest): boolean => {
  if (!request || typeof request !== 'object') {
    return false;
  }

  const badgeData = request as any;

  const validations = {
    type:
      typeof badgeData.type === 'string' &&
      badgeData.type.length > 0 &&
      Object.values(BadgeType).includes(badgeData.type),
  };

  return Object.values(validations).every(Boolean);
};

export const validateResponse = (response: BadgeConfirmationResponse): boolean => {
  if (!response || typeof response !== 'object') {
    return false;
  }
  const responseData = response as any;
  const validations = {
    status:
      typeof responseData.status === 'string' &&
      responseData.status.length >= BADGE_CONFIRMATION_RESPONSE_RULES.STATUS.minLength &&
      responseData.status.length <= BADGE_CONFIRMATION_RESPONSE_RULES.STATUS.maxLength,
  };

  return Object.values(validations).every(Boolean);
};
