import { PortfolioValuesDataService } from '../contracts/portfolioValues.contract';
import { PortfolioPositionsService } from '../services/PortfolioPositionsService';
import { Portfolio } from '../../etf-portfolio/models/portfolio';
import {
  validatePortfolioData,
  validatePortfolioValuesArray,
  validateDateRange,
} from '../validation/PortfolioValuesValidation';

export class PortfolioPositionsServiceAdapter implements PortfolioValuesDataService {
  async getPortfolioValues(): Promise<Portfolio[]> {
    const portfolioValues = await PortfolioPositionsService.getPortfolioValues();

    if (!validatePortfolioValuesArray(portfolioValues)) {
      throw new Error('Invalid portfolio values data received from service');
    }

    return portfolioValues;
  }

  async getPortfolioValuesByDateRange(startDate: Date, endDate: Date): Promise<Portfolio[]> {
    if (!validateDateRange(startDate, endDate)) {
      throw new Error('Invalid date range provided');
    }

    const portfolioValues = await PortfolioPositionsService.getPortfolioValuesByDateRange(
      startDate,
      endDate,
    );

    if (!validatePortfolioValuesArray(portfolioValues)) {
      throw new Error('Invalid portfolio values data received from service');
    }

    return portfolioValues;
  }

  async getLatestPortfolioValue(): Promise<Portfolio | null> {
    const latestValue = await PortfolioPositionsService.getLatestPortfolioValue();

    if (latestValue !== null && !validatePortfolioData(latestValue)) {
      throw new Error('Invalid latest portfolio value data received from service');
    }

    return latestValue;
  }
}
