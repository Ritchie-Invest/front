import { Portfolio, PortfolioPosition } from '../models/portfolio';

export interface PortfolioDataService {
  getPortfolio(): Promise<Portfolio>;
  getPortfolioPositions(): Promise<PortfolioPosition[]>;
  getPortfolioPositionByETF(etfId: string): Promise<PortfolioPosition | null>;
  getTotalPortfolioValue(): Promise<number>;
}

export interface PortfolioPositionProvider {
  (etfId: string): Promise<PortfolioPosition | null>;
}
