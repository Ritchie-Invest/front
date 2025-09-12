import { Portfolio } from '../models/portfolio';

export interface PortfolioDataService {
  getPortfolio(): Promise<Portfolio>;
}
