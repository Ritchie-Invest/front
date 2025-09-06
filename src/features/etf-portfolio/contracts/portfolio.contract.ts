import { Portfolio, PortfolioPosition } from '../models/portfolio';

export interface PortfolioDataService {
  getPortfolio(): Promise<Portfolio>;
  getPortfolioPositions(): Promise<PortfolioPosition[]>;
  getPortfolioPositionByETF(id: string): Promise<PortfolioPosition | null>;
  getTotalPortfolioValue(): Promise<number>;
}

export interface PortfolioPositionProvider {
  (id: string): Promise<PortfolioPosition | null>;
}
