import { ETF } from '../../etf/models/ETF';

export interface ETFListContract {
  getAllETFs(): Promise<ETF[]>;
}

export interface ETFListProvider {
  (): Promise<ETF[]>;
}
