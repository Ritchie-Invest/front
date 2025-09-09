import { ETFPriceData } from './ETFPriceData';
import { VariationType } from '~/features/etf/types/VariationType';

export interface ETFWithPriceHistory {
  history: ETFPriceData[];
  variation: number;
  variationPercent: number;
  variationDirection: VariationType;
}
