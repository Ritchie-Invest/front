import {
  ETF_WITH_CURRENT_PRICE_VALIDATION_RULES,
  validateETFWithCurrentPrice,
} from '~/features/etf/validation/ETFWithCurrentPriceValidation';
import { DATE_RANGE_OPTIONS } from '~/components/molecules/types/dateRange';

export const PRICE_HISTORY_VALIDATION_RULES = {
  DATE_RANGE: {
    required: true,
    type: 'string',
    allowedValues: DATE_RANGE_OPTIONS.map((option) => option.value),
  },
} as const;

export const validateDateRange = (dateRange: unknown): dateRange is string => {
  return (
    typeof dateRange === 'string' &&
    PRICE_HISTORY_VALIDATION_RULES.DATE_RANGE.allowedValues.includes(dateRange as any)
  );
};

export const validateHistoryPriceData = (data: unknown): boolean => {
  if (!data || typeof data !== 'object') return false;

  const priceData = data as any;
  return (
    typeof priceData.open === 'number' &&
    typeof priceData.high === 'number' &&
    typeof priceData.low === 'number' &&
    typeof priceData.close === 'number' &&
    typeof priceData.volume === 'number' &&
    priceData.timestamp instanceof Date
  );
};

export const validatePriceHistory = (priceHistory: unknown): boolean => {
  if (!Array.isArray(priceHistory)) return false;

  return priceHistory.every(validateHistoryPriceData);
};

export const validateETFWithPriceHistory = (etf: unknown): boolean => {
  if (!etf || typeof etf !== 'object') return false;

  const etfData = etf as any;

  if (!validateETFWithCurrentPrice(etfData)) return false;

  return (
    typeof etfData.currentPrice === 'number' &&
    etfData.currentPrice >= ETF_WITH_CURRENT_PRICE_VALIDATION_RULES.CURRENT_PRICE.min &&
    validatePriceHistory(etfData.priceHistory)
  );
};

export { ETF_WITH_CURRENT_PRICE_VALIDATION_RULES, validateETFWithCurrentPrice };
