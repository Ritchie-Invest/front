import { validateETF } from '~/features/etf/validation/ETFValidation';
import { ETF } from '~/features/etf/models/ETF';

export const validateETFList = (etfs: ETF[]): boolean => {
  if (!Array.isArray(etfs)) return false;

  return etfs.every(validateETF);
};
