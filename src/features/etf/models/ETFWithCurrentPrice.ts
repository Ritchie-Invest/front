import { ETF } from './ETF';

export interface ETFWithCurrentPrice extends ETF {
  currentPrice: number;
  priceChangePercentage: number;
  isGaining: boolean;
}
