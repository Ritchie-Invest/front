import { PortfolioPosition, PortfolioHistoryResponse } from '../models/PortfolioPosition';
import { DateRangeType } from '~/components/molecules/types/dateRange';

export interface PortfolioPositionsDataService {
  getPortfolioPositions(dateRange: DateRangeType): Promise<PortfolioHistoryResponse>;
}

export interface PortfolioPositionProvider {
  (id: string): Promise<PortfolioPosition | null>;
}
