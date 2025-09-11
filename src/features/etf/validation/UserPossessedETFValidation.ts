import { UserPossessedETF } from '../models/UserPossessedETF';

export const USER_POSSESSED_ETF_VALIDATION_RULES = {
  SHARES: {
    required: true,
    type: 'number',
    min: 0,
  },
  AMOUNT: {
    required: true,
    type: 'number',
    min: 0,
  },
} as const;

export const validateNumberField = (
  value: unknown,
  rules: { required: boolean; type: string; min?: number; max?: number },
): boolean => {
  if (rules.required && (value === null || value === undefined)) {
    return false;
  }

  if (typeof value !== rules.type) {
    return false;
  }

  if (rules.min !== undefined) {
    if (typeof value !== 'number' || value < rules.min) {
      return false;
    }
  }

  if (rules.max !== undefined) {
    if (typeof value !== 'number' || value > rules.max) {
      return false;
    }
  }

  return true;
};

export const validateUserPossessedETF = (etf: UserPossessedETF): boolean => {
  const validations = {
    shares: validateNumberField(etf.shares, USER_POSSESSED_ETF_VALIDATION_RULES.SHARES),
    amount: validateNumberField(etf.amount, USER_POSSESSED_ETF_VALIDATION_RULES.AMOUNT),
  };

  const isValid = Object.values(validations).every(Boolean);
  if (!isValid) {
    console.error('UserPossessedETF validation failed for:', etf);
  }

  return isValid;
};
