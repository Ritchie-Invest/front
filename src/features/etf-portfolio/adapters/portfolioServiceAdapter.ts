import { PortfolioDataService } from '../contracts/portfolio.contract';
import { portfolioService } from '../service/portfolioService';
import { Portfolio, PortfolioPosition } from '../models/portfolio';
import {
  validatePortfolioData,
  validatePortfolioPositionData,
} from '../validation/PortfolioValidation';

export class PortfolioServiceAdapter implements PortfolioDataService {
  async getPortfolio(): Promise<Portfolio> {
    const portfolio = await portfolioService.getPortfolio();

    if (!validatePortfolioData(portfolio)) {
      throw new Error('Invalid portfolio data received from service');
    }

    return portfolio;
  }

  async getPortfolioPositionByETF(id: string): Promise<PortfolioPosition | null> {
    const position = await portfolioService.getPortfolioPositionByETF(id);

    if (position && !validatePortfolioPositionData(position)) {
      throw new Error('Invalid portfolio position data received from service');
    }

    return position;
  }
}
