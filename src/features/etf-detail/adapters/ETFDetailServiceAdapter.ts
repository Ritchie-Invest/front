import { ETFDetailService } from '../services/ETFDetailService';
import { ETFDataService } from '../contracts/ETFDetail.contracts';

export class ETFDetailServiceAdapter implements ETFDataService {
  async getETFWithPriceHistory(etfId: number, dateRange: string): Promise<any> {
    return ETFDetailService.getETFWithPriceHistory(etfId, dateRange as any);
  }
}
