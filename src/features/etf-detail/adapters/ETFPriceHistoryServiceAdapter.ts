import { ETFPriceHistoryService } from '../services/ETFPriceHistoryService';
import { ETFPriceHistoryContract } from '../contracts/ETFPriceHistoryContracts';
import { validateETFId } from '../../etf/validation/ETFValidation';
import {
  validateDateRange,
  validateETFWithPriceHistory,
} from '../validation/ETFPriceHistoryValidation';
import { ETFWithPriceHistory } from '../models/ETFPriceHistory';

export class ETFPriceHistoryServiceAdapter implements ETFPriceHistoryContract {
  async getETFWithPriceHistory(id: string, dateRange: string): Promise<ETFWithPriceHistory> {
    if (!validateETFId(id)) {
      throw new Error(`Invalid ETF ID: ${id}. Must be a non-empty string.`);
    }

    if (!validateDateRange(dateRange)) {
      throw new Error(`Invalid date range: ${dateRange}. Must be one of: 7D, 1M, 6M, 1Y`);
    }

    const result = await ETFPriceHistoryService.getETFWithPriceHistory(id, dateRange as any);

    if (!validateETFWithPriceHistory(result)) {
      throw new Error('Invalid ETF price history data received from service');
    }

    return result;
  }
}
