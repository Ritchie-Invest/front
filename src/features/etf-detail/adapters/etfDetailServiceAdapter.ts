import { ETFDetailService, ETFDataService } from '../index';

export class ETFDetailServiceAdapter implements ETFDataService {
  async getETFWithPriceHistory(etfId: number, dateRange: string): Promise<any> {
    return ETFDetailService.getETFWithPriceHistory(etfId, dateRange as any);
  }
}
