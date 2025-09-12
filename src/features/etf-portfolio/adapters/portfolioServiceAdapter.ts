import { PortfolioDataService } from '../contracts/portfolio.contract';
import { portfolioService } from '../service/portfolioService';
import { Portfolio } from '../models/portfolio';
import { validatePortfolioData } from '../validation/PortfolioValidation';

export class PortfolioServiceAdapter implements PortfolioDataService {
  async getPortfolio(): Promise<Portfolio> {
    const portfolio = await portfolioService.getPortfolio();

    if (!validatePortfolioData(portfolio)) {
      throw new Error('Invalid portfolio data received from service');
    }

    return portfolio;
  }
}
