import { ETF } from '../models/ETF';

export const ETF_VALIDATION_RULES = {
  ETF_ID: {
    required: true,
    type: 'string',
    minLength: 1,
  },
  TICKER: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 10,
    pattern: /^[A-Z0-9]+$/,
  },
  NAME: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 200,
  },
} as const;

export const validateETFId = (id: unknown): id is string => {
  return typeof id === 'string' && id.length > 0;
};

export const validateETF = (etf: ETF): boolean => {
  if (!etf || typeof etf !== 'object') return false;

  const etfData = etf as any;
  return (
    validateETFId(etfData.id) &&
    typeof etfData.ticker === 'string' &&
    etfData.ticker.length >= ETF_VALIDATION_RULES.TICKER.minLength &&
    etfData.ticker.length <= ETF_VALIDATION_RULES.TICKER.maxLength &&
    ETF_VALIDATION_RULES.TICKER.pattern.test(etfData.ticker) &&
    typeof etfData.name === 'string' &&
    etfData.name.length >= ETF_VALIDATION_RULES.NAME.minLength &&
    etfData.name.length <= ETF_VALIDATION_RULES.NAME.maxLength
  );
};
