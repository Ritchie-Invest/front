import { ETFDetailService } from '../services/etfDetailService';
import { ETFDataService } from '../contracts/etfDetail.contracts';

export class ETFDetailServiceAdapter implements ETFDataService {
  async getETFWithPriceHistory(etfId: number, dateRange: string): Promise<any> {
    return ETFDetailService.getETFWithPriceHistory(etfId, dateRange as any);
  }
}
