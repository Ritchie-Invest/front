import { ETFWithCurrentPrice } from '../models/ETFWithCurrentPrice';

export interface ETFDataService {
  getAllETFs(): Promise<ETFWithCurrentPrice[]>;
}

export interface ETFProvider {
  (): Promise<ETFWithCurrentPrice[]>;
}
