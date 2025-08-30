import { ETFPriceHistoryService } from '../services/ETFPriceHistoryService';
import { ETFListContract } from '../contracts/ETFPriceHistoryContracts';
import { validateETFId } from '../../etf/validation/ETFValidation';
import { validateDateRange } from '../validation/ETFPriceHistoryValidation';

export class ETFPriceHistoryServiceAdapter implements ETFListContract {
  async getETFWithPriceHistory(id: string, dateRange: string): Promise<any> {
    console.log(`getETFWithPriceHistory called with id: ${id}, dateRange: ${dateRange}`);

    if (!validateETFId(id)) {
      console.error(`Invalid ETF ID: ${id}. Must be a non-empty string.`);
      throw new Error(`Invalid ETF ID: ${id}. Must be a non-empty string.`);
    }

    if (!validateDateRange(dateRange)) {
      console.error(`Invalid date range: ${dateRange}. Must be one of: 7D, 1M, 6M, 1Y`);
      throw new Error(`Invalid date range: ${dateRange}. Must be one of: 7D, 1M, 6M, 1Y`);
    }

    console.log(`Fetching price history for ETF ID: ${id} with date range: ${dateRange}`);
    const result = await ETFPriceHistoryService.getETFWithPriceHistory(id, dateRange as any);
    console.log(`Result received for ETF ID: ${id}:`, result);
    return result;
  }
}
