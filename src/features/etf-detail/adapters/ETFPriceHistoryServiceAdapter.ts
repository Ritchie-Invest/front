import { ETFPriceHistoryService } from '../services/ETFPriceHistoryService';
import { ETFDataService } from '../contracts/ETFPriceHistoryContracts';
import { validateETFId, validateDateRange } from '../../etf/validation/ETFValidation';

export class ETFPriceHistoryServiceAdapter implements ETFDataService {
  async getETFWithPriceHistory(etfId: string, dateRange: string): Promise<any> {
    if (!validateETFId(etfId)) {
      throw new Error(`Invalid ETF ID: ${etfId}. Must be a non-empty string.`);
    }

    if (!validateDateRange(dateRange)) {
      throw new Error(`Invalid date range: ${dateRange}. Must be one of: 7D, 1M, 6M, 1Y`);
    }

    return ETFPriceHistoryService.getETFWithPriceHistory(etfId, dateRange as any);
  }
}
