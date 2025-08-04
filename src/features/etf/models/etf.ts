import { ETF } from '~/models/etf';

export interface ETFWithCurrentPrice extends ETF {
  currentPrice: number;
  priceChangePercentage: number;
  isGaining: boolean;
}
