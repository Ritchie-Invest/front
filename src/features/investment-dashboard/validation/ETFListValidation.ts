import { validateETFWithCurrentPrice } from '~/features/etf/validation/ETFWithCurrentPriceValidation';
import { ETFWithCurrentPrice } from '~/features/etf/models/ETFWithCurrentPrice';

export const validateETFList = (etfs: ETFWithCurrentPrice[]): boolean => {
  if (!Array.isArray(etfs)) return false;

  return etfs.every(validateETFWithCurrentPrice);
};
