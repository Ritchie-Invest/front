import { ETFWithCurrentPrice } from '~/features/etf/models/ETFWithCurrentPrice';
import { ETFPriceData } from './ETFPriceData';

export interface ETFWithPriceHistory extends ETFWithCurrentPrice {
  priceHistory: ETFPriceData[];
}
