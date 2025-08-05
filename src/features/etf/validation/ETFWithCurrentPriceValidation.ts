import { ETF_VALIDATION_RULES, validateETF } from './ETFValidation';
import { ETFWithCurrentPrice } from '../models/ETFWithCurrentPrice';

export const ETF_WITH_CURRENT_PRICE_VALIDATION_RULES = {
  ...ETF_VALIDATION_RULES,
  CURRENT_PRICE: {
    required: true,
    type: 'number',
    min: 0,
  },
  PRICE_CHANGE_PERCENTAGE: {
    required: true,
    type: 'number',
  },
  IS_GAINING: {
    required: true,
    type: 'boolean',
  },
} as const;

export const validateETFWithCurrentPrice = (etf: ETFWithCurrentPrice): boolean => {
  if (!validateETF(etf)) return false;

  return (
    typeof etf.currentPrice === 'number' &&
    etf.currentPrice >= ETF_WITH_CURRENT_PRICE_VALIDATION_RULES.CURRENT_PRICE.min &&
    typeof etf.priceChangePercentage === 'number' &&
    etf.priceChangePercentage >= -100 &&
    etf.priceChangePercentage <= 100 &&
    typeof etf.isGaining === 'boolean' &&
    ((etf.priceChangePercentage > 0 && etf.isGaining === true) ||
      (etf.priceChangePercentage <= 0 && etf.isGaining === false))
  );
};
