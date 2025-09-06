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

  const etfData = etf as any;
  return (
    typeof etfData.currentPrice === 'number' &&
    etfData.currentPrice >= ETF_WITH_CURRENT_PRICE_VALIDATION_RULES.CURRENT_PRICE.min &&
    typeof etfData.priceChangePercentage === 'number' &&
    etfData.priceChangePercentage >= -100 &&
    etfData.priceChangePercentage <= 100 &&
    typeof etfData.isGaining === 'boolean' &&
    ((etfData.priceChangePercentage > 0 && etfData.isGaining === true) ||
      (etfData.priceChangePercentage <= 0 && etfData.isGaining === false))
  );
};
