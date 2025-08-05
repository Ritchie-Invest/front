import { ConversionRequest } from '../models/requests';

export const CONVERSION_VALIDATION_RULES = {
  EURO_AMOUNT: {
    required: true,
    type: 'number',
    min: 0.01,
    max: 1000000,
  },
  ETF_ID: {
    required: true,
    type: 'string',
    minLength: 1,
  },
} as const;

export const validateEuroAmount = (euroAmount: unknown): euroAmount is number => {
  return (
    typeof euroAmount === 'number' &&
    !isNaN(euroAmount) &&
    euroAmount >= CONVERSION_VALIDATION_RULES.EURO_AMOUNT.min &&
    euroAmount <= CONVERSION_VALIDATION_RULES.EURO_AMOUNT.max
  );
};

export const validateConversionRequest = (request: ConversionRequest): boolean => {
  if (!request || typeof request !== 'object') return false;

  return (
    validateEuroAmount(request.euroAmount) &&
    typeof request.etfId === 'string' &&
    request.etfId.length >= CONVERSION_VALIDATION_RULES.ETF_ID.minLength
  );
};
