import { ETF } from '~/models/etf';

export interface ETFWithPriceHistory extends ETF {
  currentPrice: number;
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
