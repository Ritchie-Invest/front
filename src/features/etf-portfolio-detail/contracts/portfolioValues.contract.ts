import { Portfolio } from '../../etf-portfolio/models/portfolio';

export interface PortfolioValuesDataService {
  getPortfolioValues(): Promise<Portfolio[]>;
  getPortfolioValuesByDateRange(startDate: Date, endDate: Date): Promise<Portfolio[]>;
  getLatestPortfolioValue(): Promise<Portfolio | null>;
}
