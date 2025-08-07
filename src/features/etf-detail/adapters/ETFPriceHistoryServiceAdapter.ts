import { ETFPriceHistoryService } from '../services/ETFPriceHistoryService';
import { ETFListContract } from '../contracts/ETFPriceHistoryContracts';
import { ETFWithPriceHistory } from '../models/ETFPriceHistory';
import { DateRangeType } from '~/components/molecules/types/dateRange';

export class ETFPriceHistoryServiceAdapter implements ETFListContract {
  async getETFWithPriceHistory(etfId: string, dateRange: string): Promise<ETFWithPriceHistory> {
    return ETFPriceHistoryService.getETFWithPriceHistory(etfId, dateRange as DateRangeType);
  }
}
