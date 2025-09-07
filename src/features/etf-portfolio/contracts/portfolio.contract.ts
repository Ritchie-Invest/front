import { Portfolio, PortfolioPosition } from '../models/portfolio';

export interface PortfolioDataService {
  getPortfolio(): Promise<Portfolio>;
  getPortfolioPositionByETF(etfId: string): Promise<PortfolioPosition>;
}

export interface PortfolioPositionProvider {
  (id: string): Promise<PortfolioPosition | null>;
}
