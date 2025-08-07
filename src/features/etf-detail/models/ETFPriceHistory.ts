import { ETFWithCurrentPrice } from '~/features/etf/models/ETFWithCurrentPrice';
import { ETFPriceData } from '~/features/etf/models/ETFPriceData';

export interface ETFWithPriceHistory extends ETFWithCurrentPrice {
  priceHistory: ETFPriceData[];
}
