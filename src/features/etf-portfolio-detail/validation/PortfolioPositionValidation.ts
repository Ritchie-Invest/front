import {
  validatePortfolioData,
  validatePortfolioId,
  validatePortfolio,
  PORTFOLIO_VALIDATION_RULES,
} from '../../etf-portfolio/validation/PortfolioValidation';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import { Portfolio } from '../../etf-portfolio/models/portfolio';
import { PortfolioPosition } from '../models/PortfolioPosition';

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

export const validateDateRangeType = (dateRange: unknown): dateRange is DateRangeType => {
  const allowedValues: DateRangeType[] = [
    DateRangeType.SevenDays,
    DateRangeType.OneMonth,
    DateRangeType.SixMonths,
    DateRangeType.OneYear,
  ];
  return typeof dateRange === 'string' && allowedValues.includes(dateRange as DateRangeType);
};

export const validatePortfolioPosition = (data: unknown): data is PortfolioPosition => {
  if (!data || typeof data !== 'object') return false;
  const pos = data as any;
  return (
    typeof pos.id === 'string' &&
    typeof pos.cash === 'number' &&
    typeof pos.investments === 'number' &&
    typeof pos.date === 'string' &&
    !isNaN(new Date(pos.date).getTime())
  );
};

export const validatePortfolioPositions = (data: unknown): data is PortfolioPosition[] => {
  if (!Array.isArray(data)) return false;
  return data.every(validatePortfolioPosition);
};
