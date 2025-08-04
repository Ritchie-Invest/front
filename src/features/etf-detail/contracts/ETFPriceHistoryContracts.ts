import { ETFWithPriceHistory } from '../models/ETFPriceHistory';

export interface ETFDataService {
  getETFWithPriceHistory(etfId: string, dateRange: string): Promise<ETFWithPriceHistory>;
}

export interface ChartProvider {
  (data: any[]): React.ReactNode;
}

export interface HeaderProvider {
  (etfData: any): React.ReactNode;
}
