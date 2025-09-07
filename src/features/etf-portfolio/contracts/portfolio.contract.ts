import { Portfolio, PortfolioPosition } from '../models/portfolio';

export interface PortfolioDataService {
  getPortfolio(): Promise<Portfolio>;
}

export interface PortfolioPositionProvider {
  (id: string): Promise<PortfolioPosition | null>;
}
