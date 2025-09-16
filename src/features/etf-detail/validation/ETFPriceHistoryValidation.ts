import { ETF_VALIDATION_RULES, validateETF } from '~/features/etf/validation/ETFValidation';
import { DATE_RANGE_OPTIONS } from '../../../components/molecules/types/dateRange';
import { VariationType } from '~/features/etf/types/VariationType';

export const PRICE_HISTORY_VALIDATION_RULES = {
  DATE_RANGE: {
    required: true,
    type: 'string',
    allowedValues: DATE_RANGE_OPTIONS.map((option) => option.value),
  },
  VARIATION: {
    required: true,
    type: 'number',
  },
  VARIATION_PERCENT: {
    required: true,
    type: 'number',
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

  const isValidTimestamp =
    priceData.timestamp instanceof Date ||
    (typeof priceData.timestamp === 'string' && !isNaN(Date.parse(priceData.timestamp)));

  const isValid =
    typeof priceData.open === 'number' &&
    typeof priceData.high === 'number' &&
    typeof priceData.low === 'number' &&
    typeof priceData.close === 'number' &&
    typeof priceData.volume === 'number' &&
    isValidTimestamp;

  // Debug logging for troubleshooting
  if (!isValid) {
    console.warn('Invalid price data:', {
      data: priceData,
      checks: {
        hasOpen: typeof priceData.open === 'number',
        hasHigh: typeof priceData.high === 'number',
        hasLow: typeof priceData.low === 'number',
        hasClose: typeof priceData.close === 'number',
        hasVolume: typeof priceData.volume === 'number',
        hasValidTimestamp: isValidTimestamp,
      },
    });
  }

  return isValid;
};

export const validatePriceHistory = (priceHistory: unknown): boolean => {
  if (!Array.isArray(priceHistory)) return false;

  return priceHistory.every(validateHistoryPriceData);
};

// Validation pour les données retournées par l'API (seulement l'historique)
export const validatePriceHistoryApiResponse = (data: unknown): boolean => {
  if (!data || typeof data !== 'object') {
    console.error('Price history API response validation failed: not an object', data);
    return false;
  }

  const responseData = data as any;

  const isValidVariationDirection =
    typeof responseData.variationDirection === 'string' &&
    Object.values(VariationType).includes(responseData.variationDirection as VariationType);

  const isValidHistory = validatePriceHistory(responseData.history);
  const hasValidVariation = typeof responseData.variation === 'number';
  const hasValidVariationPercent = typeof responseData.variationPercent === 'number';

  const isValid =
    isValidHistory && hasValidVariation && hasValidVariationPercent && isValidVariationDirection;

  if (!isValid) {
    console.error('Price history API response validation failed:', {
      data: responseData,
      checks: {
        hasValidHistory: isValidHistory,
        hasValidVariation: hasValidVariation,
        hasValidVariationPercent: hasValidVariationPercent,
        hasValidVariationDirection: isValidVariationDirection,
      },
    });
  }

  return isValid;
};

export const validateETFWithPriceHistory = (data: unknown): boolean => {
  return validatePriceHistoryApiResponse(data);
};

export { ETF_VALIDATION_RULES, validateETF };
