import { ETFWithCurrentPrice } from '../../etf/models/ETFWithCurrentPrice';

export interface ETFListContract {
  getAllETFs(): Promise<ETFWithCurrentPrice[]>;
}

export interface ETFListProvider {
  (): Promise<ETFWithCurrentPrice[]>;
}
