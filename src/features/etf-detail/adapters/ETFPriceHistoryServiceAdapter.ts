import { ETFPriceHistoryService } from '../services/ETFPriceHistoryService';
import { ETFListContract } from '../contracts/ETFPriceHistoryContracts';
import { validateETFId } from '../../etf/validation/ETFValidation';
import { validateDateRange } from '../validation/ETFPriceHistoryValidation';

export class ETFPriceHistoryServiceAdapter implements ETFListContract {
  async getETFWithPriceHistory(id: string, dateRange: string): Promise<any> {
    if (!validateETFId(id)) {
      throw new Error(`Invalid ETF ID: ${id}. Must be a non-empty string.`);
    }

    if (!validateDateRange(dateRange)) {
      throw new Error(`Invalid date range: ${dateRange}. Must be one of: 7D, 1M, 6M, 1Y`);
    }

    return ETFPriceHistoryService.getETFWithPriceHistory(id, dateRange as any);
  }
}
