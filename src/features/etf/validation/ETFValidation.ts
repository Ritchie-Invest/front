import { ETF } from '../models/ETF';
import { TickerType } from '../types/TickerType';
import { CurrencyType } from '../types/CurrencyType';
import { VariationType } from '../types/VariationType';

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
  TYPE: {
    required: true,
    type: 'string',
    allowedValues: Object.values(TickerType),
  },
  CURRENCY: {
    required: true,
    type: 'string',
    allowedValues: Object.values(CurrencyType),
  },
  PRICE: {
    required: true,
    type: 'number',
    min: 0,
  },
  VARIATION: {
    required: true,
    type: 'number',
  },
  VARIATION_PERCENT: {
    required: true,
    type: 'number',
  },
  VARIATION_DIRECTION: {
    required: true,
    type: 'string',
    allowedValues: Object.values(VariationType),
  },
} as const;

export const validateETFId = (id: unknown): id is string => {
  return typeof id === 'string' && id.length > 0;
};

export const validateETF = (etf: ETF): boolean => {
  if (!etf || typeof etf !== 'object') {
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
    type: ETF_VALIDATION_RULES.TYPE.allowedValues.includes(etfData.type),
    currency: ETF_VALIDATION_RULES.CURRENCY.allowedValues.includes(etfData.currency),
    price: typeof etfData.price === 'number' && etfData.price >= ETF_VALIDATION_RULES.PRICE.min,
    variation: typeof etfData.variation === 'number',
    variationPercent: typeof etfData.variationPercent === 'number',
    variationDirection: ETF_VALIDATION_RULES.VARIATION_DIRECTION.allowedValues.includes(
      etfData.variationDirection,
    ),
  };

  const isValid = Object.values(validations).every(Boolean);
  if (!isValid) {
  }

  return isValid;
};
