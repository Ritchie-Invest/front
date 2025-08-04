import { PortfolioDataService } from '../contracts/portfolio.contract';
import { portfolioService } from '../service/portfolioService';
import { Portfolio, PortfolioPosition } from '../models/portfolio';

export class PortfolioServiceAdapter implements PortfolioDataService {
  async getPortfolio(): Promise<Portfolio> {
    return portfolioService.getPortfolio();
  }

  async getPortfolioPositions(): Promise<PortfolioPosition[]> {
    return portfolioService.getPortfolioPositions();
  }

  async getPortfolioPositionByETF(etfId: number): Promise<PortfolioPosition | null> {
    return portfolioService.getPortfolioPositionByETF(etfId);
  }

  async getTotalPortfolioValue(): Promise<number> {
    return portfolioService.getTotalPortfolioValue();
  }
}
