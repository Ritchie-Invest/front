import { PortfolioPositionsService } from '../services/PortfolioPositionsService';
import { PortfolioPosition, PortfolioHistoryResponse } from '../models/PortfolioPosition';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import {
  validateDateRangeType,
  validatePortfolioPositions,
} from '../validation/PortfolioPositionValidation';

export class PortfolioPositionsServiceAdapter {
  async getPortfolioPositions(dateRange: DateRangeType): Promise<PortfolioHistoryResponse> {
    if (!validateDateRangeType(dateRange)) {
      throw new Error(`Invalid date range: ${dateRange}. Must be one of: 7D, 1M, 6M, 1Y`);
    }

    const result = await PortfolioPositionsService.getPortfolioPositions(dateRange);

    if (
      !result ||
      !Array.isArray(result.positions) ||
      !validatePortfolioPositions(result.positions)
    ) {
      throw new Error('Invalid portfolio positions data received from service');
    }

    return {
      positions: result.positions,
      variation: typeof result.variation === 'number' ? result.variation : 0,
      variationPercent: typeof result.variationPercent === 'number' ? result.variationPercent : 0,
      variationDirection:
        typeof result.variationDirection === 'string' ? result.variationDirection : 'FLAT',
    };
  }
}
