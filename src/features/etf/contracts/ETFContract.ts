import { ETFWithCurrentPrice } from '../models/ETF';

export interface ETFDataService {
  getAllETFs(): Promise<ETFWithCurrentPrice[]>;
}

export interface ETFProvider {
  (): Promise<ETFWithCurrentPrice[]>;
}
