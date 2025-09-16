import { ETFWithPriceHistory } from '../models/ETFPriceHistory';

export interface ETFPriceHistoryContract {
  getETFWithPriceHistory(id: string, dateRange: string): Promise<ETFWithPriceHistory>;
}

export interface ChartProvider {
  (data: any[]): React.ReactNode;
}

export interface HeaderProvider {
  (etfData: any): React.ReactNode;
}
