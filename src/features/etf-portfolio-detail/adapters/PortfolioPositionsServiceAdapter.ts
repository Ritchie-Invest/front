import { PortfolioPositionsService } from '../services/PortfolioPositionsService';
import { PortfolioPosition } from '../models/PortfolioPosition';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import {
  validateDateRangeType,
  validatePortfolioPositions,
} from '../validation/PortfolioPositionValidation';

export class PortfolioPositionsServiceAdapter {
  async getPortfolioPositions(dateRange: DateRangeType): Promise<PortfolioPosition[]> {
    if (!validateDateRangeType(dateRange)) {
      throw new Error(`Invalid date range: ${dateRange}. Must be one of: 7D, 1M, 6M, 1Y`);
    }

    const result = await PortfolioPositionsService.getPortfolioPositions(dateRange);

    if (!validatePortfolioPositions(result.positions)) {
      throw new Error('Invalid portfolio positions data received from service');
    }

    return result.positions;
  }
}
