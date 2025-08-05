import { PossessedValueRequest } from '../models/requests';
import { validateETFId } from '~/features/etf/validation/ETFValidation';

export const POSSESSED_VALUE_VALIDATION_RULES = {
  ETF_ID: {
    required: true,
    type: 'string',
    minLength: 1,
  },
} as const;

export const validatePossessedValueRequest = (request: PossessedValueRequest): boolean => {
  if (!request || typeof request !== 'object') return false;
  return validateETFId(request.etfId);
};
