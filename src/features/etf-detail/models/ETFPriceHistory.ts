import { ETF } from '~/features/etf/models/ETF';
import { ETFPriceData } from './ETFPriceData';

export interface ETFWithPriceHistory extends ETF {
  priceHistory: ETFPriceData[];
}
