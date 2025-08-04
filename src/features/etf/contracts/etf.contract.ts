import { ETFWithCurrentPrice } from '../models/etf';

export interface ETFDataService {
  getAllETFs(): Promise<ETFWithCurrentPrice[]>;
}

export interface ETFProvider {
  (): Promise<ETFWithCurrentPrice[]>;
}
