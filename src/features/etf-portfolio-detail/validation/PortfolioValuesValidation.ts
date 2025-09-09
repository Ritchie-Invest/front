import {
  validatePortfolioData,
  validatePortfolioId,
  validatePortfolio,
  PORTFOLIO_VALIDATION_RULES,
} from '../../etf-portfolio/validation/PortfolioValidation';
import { Portfolio } from '../../etf-portfolio/models/portfolio';

export {
  validatePortfolioData,
  validatePortfolioId,
  validatePortfolio,
  PORTFOLIO_VALIDATION_RULES,
};

export const validatePortfolioValuesArray = (data: unknown): data is Portfolio[] => {
  if (!Array.isArray(data)) return false;
  return data.every((portfolio) => validatePortfolioData(portfolio));
};

export const validateDateRange = (startDate: Date, endDate: Date): boolean => {
  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    return false;
  }

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    return false;
  }

  return startDate <= endDate;
};
