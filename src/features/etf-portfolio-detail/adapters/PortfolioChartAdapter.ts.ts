import { PortfolioValuesDataService } from '../contracts/portfolioValues.contract';
import { portfolioValuesService } from '../services/PortfolioValuesService';
import { Portfolio } from '../../etf-portfolio/models/portfolio';
import {
  validatePortfolioData,
  validatePortfolioValuesArray,
  validateDateRange,
} from '../validation/PortfolioValuesValidation';

export class PortfolioValuesServiceAdapter implements PortfolioValuesDataService {
  async getPortfolioValues(): Promise<Portfolio[]> {
    const portfolioValues = await portfolioValuesService.getPortfolioValues();

    if (!validatePortfolioValuesArray(portfolioValues)) {
      throw new Error('Invalid portfolio values data received from service');
    }

    return portfolioValues;
  }

  async getPortfolioValuesByDateRange(startDate: Date, endDate: Date): Promise<Portfolio[]> {
    if (!validateDateRange(startDate, endDate)) {
      throw new Error('Invalid date range provided');
    }

    const portfolioValues = await portfolioValuesService.getPortfolioValuesByDateRange(
      startDate,
      endDate,
    );

    if (!validatePortfolioValuesArray(portfolioValues)) {
      throw new Error('Invalid portfolio values data received from service');
    }

    return portfolioValues;
  }

  async getLatestPortfolioValue(): Promise<Portfolio | null> {
    const latestValue = await portfolioValuesService.getLatestPortfolioValue();

    if (latestValue !== null && !validatePortfolioData(latestValue)) {
      throw new Error('Invalid latest portfolio value data received from service');
    }

    return latestValue;
  }
}
