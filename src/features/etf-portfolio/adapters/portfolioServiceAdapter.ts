import { PortfolioDataService } from '../contracts/portfolio.contract';
import { portfolioService } from '../service/portfolioService';
import { Portfolio, PortfolioPosition } from '../models/portfolio';
import { validateETFId } from '~/features/etf/validation/ETFValidation';
import {
  validatePortfolioData,
  validatePortfolioPositionData,
  validatePortfolioPositionsArray,
  validateTotalValue,
} from '../validation/PortfolioValidation';

export class PortfolioServiceAdapter implements PortfolioDataService {
  async getPortfolio(): Promise<Portfolio> {
    const portfolio = await portfolioService.getPortfolio();

    if (!validatePortfolioData(portfolio)) {
      throw new Error('Invalid portfolio data received from service');
    }

    return portfolio;
  }

  async getPortfolioPositions(): Promise<PortfolioPosition[]> {
    const positions = await portfolioService.getPortfolioPositions();

    if (!validatePortfolioPositionsArray(positions)) {
      throw new Error(
        `Invalid portfolio positions data received from service: ${JSON.stringify(positions)}`,
      );
    }

    return positions;
  }

  async getPortfolioPositionByETF(id: string): Promise<PortfolioPosition | null> {
    if (!validateETFId(id)) {
      throw new Error('Invalid ETF ID provided');
    }

    const position = await portfolioService.getPortfolioPositionByETF(id);

    if (position !== null && !validatePortfolioPositionData(position)) {
      throw new Error('Invalid portfolio position data received from service');
    }

    return position;
  }

  async getTotalPortfolioValue(): Promise<number> {
    const totalValue = await portfolioService.getTotalPortfolioValue();

    if (!validateTotalValue(totalValue)) {
      throw new Error('Invalid total portfolio value received from service');
    }

    return totalValue;
  }
}
