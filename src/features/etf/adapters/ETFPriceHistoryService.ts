import { ETFPriceHistoryService } from '../services/ETFPriceHistoryService';

export class ETFPriceHistoryServiceAdapter implements ETFPriceHistoryService {
  async getETFWithPriceHistory(etfId: number, dateRange: string): Promise<any> {
    return ETFPriceHistoryService.getETFWithPriceHistory(etfId, dateRange as any);
  }
}
