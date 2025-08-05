import { ETFWithCurrentPrice } from '~/features/etf/models/ETFWithCurrentPrice';

export interface ETFWithPriceHistory extends ETFWithCurrentPrice {
  priceHistory: ETFPriceData[];
}

export interface ETFPriceData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: Date;
}
