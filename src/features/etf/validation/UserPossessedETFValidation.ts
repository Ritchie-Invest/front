import { UserPossessedETF } from '../models/UserPossessedETF';
import { validateETFId } from './ETFValidation';

export const ETF_VALIDATION_RULES = {
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
  AMOUNT: {
    required: true,
    type: 'number',
    min: 0,
  },
  SHARES: {
    required: true,
    type: 'number',
    min: 0,
  },
} as const;

export const validateUserPossessedETF = (etf: UserPossessedETF): boolean => {
  if (!etf || typeof etf !== 'object') {
    console.error('UserPossessedETF validation failed: not an object', etf);
    return false;
  }

  const etfData = etf as any;

  const validations = {
    id: validateETFId(etfData.id),
    symbol:
      typeof etfData.symbol === 'string' &&
      etfData.symbol.length >= ETF_VALIDATION_RULES.SYMBOL.minLength &&
      etfData.symbol.length <= ETF_VALIDATION_RULES.SYMBOL.maxLength,
    name:
      typeof etfData.name === 'string' &&
      etfData.name.length >= ETF_VALIDATION_RULES.NAME.minLength &&
      etfData.name.length <= ETF_VALIDATION_RULES.NAME.maxLength,
    amount: typeof etfData.amount === 'number' && etfData.amount >= ETF_VALIDATION_RULES.AMOUNT.min,
    shares: typeof etfData.shares === 'number' && etfData.shares >= ETF_VALIDATION_RULES.SHARES.min,
  };

  const isValid = Object.values(validations).every(Boolean);
  if (!isValid) {
    console.error('ETF validation failed for:', etfData);
  }

  return isValid;
};
