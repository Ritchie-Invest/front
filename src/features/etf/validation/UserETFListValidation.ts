import { validateUserPossessedETF } from './UserPossessedETFValidation';
import { UserPossessedETFListItem } from '../models/UserPossessedETF';
import { USER_POSSESSED_ETF_VALIDATION_RULES } from './UserPossessedETFValidation';
export const USER_ETF_LIST_VALIDATION_RULES = {
  ...USER_POSSESSED_ETF_VALIDATION_RULES,
  ID: {
    required: true,
    type: 'string',
    minLength: 1,
  },
  SYMBOL: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 20,
  },
  NAME: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 200,
  },
} as const;

export const validateStringField = (
  value: unknown,
  rules: { required: boolean; type: string; minLength?: number; maxLength?: number },
): boolean => {
  if (rules.required && (value === null || value === undefined)) {
    return false;
  }
  if (typeof value !== rules.type) {
    return false;
  }
  if (rules.minLength !== undefined) {
    if (typeof value !== 'string' || value.length < rules.minLength) {
      return false;
    }
  }
  if (rules.maxLength !== undefined) {
    if (typeof value !== 'string' || value.length > rules.maxLength) {
      return false;
    }
  }
  return true;
};

export const validateUserPossessedETFListItem = (etf: UserPossessedETFListItem): boolean => {
  if (!etf || typeof etf !== 'object') {
    return false;
  }

  const validations = {
    id: validateStringField(etf.id, USER_ETF_LIST_VALIDATION_RULES.ID),
    name: validateStringField(etf.name, USER_ETF_LIST_VALIDATION_RULES.NAME),
    symbol: validateStringField(etf.symbol, USER_ETF_LIST_VALIDATION_RULES.SYMBOL),
    numericValues: validateUserPossessedETF(etf),
  };
  return Object.values(validations).every(Boolean);
};
