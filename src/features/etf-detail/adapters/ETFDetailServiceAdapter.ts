import { ETFPriceHistoryService } from '../services/ETFPriceHistoryService';
import { ETFDataService } from '../contracts/ETFDetail.contracts';

export class ETFDetailServiceAdapter implements ETFDataService {
  async getETFWithPriceHistory(id: string, dateRange: string): Promise<any> {
    return ETFPriceHistoryService.getETFWithPriceHistory(id, dateRange as any);
  }
}
