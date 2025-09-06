import { validateETFId } from '~/features/etf/validation/ETFValidation';

export const PORTFOLIO_VALIDATION_RULES = {
  PORTFOLIO_ID: {
    required: true,
    type: 'number',
    min: 1,
  },
  BALANCE: {
    required: true,
    type: 'number',
    min: 0,
  },
  CURRENT_VALUE: {
    required: true,
    type: 'number',
    min: 0,
  },
  TIMESTAMP: {
    required: true,
    type: 'date',
  },
  ETF_ID: {
    required: true,
    type: 'number',
    min: 1,
  },
  TICKER: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 10,
    pattern: /^[A-Z0-9]+$/,
  },
  NAME: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 200,
  },
  QUANTITY: {
    required: true,
    type: 'number',
    min: 0,
  },
  CURRENT_PRICE: {
    required: true,
    type: 'number',
    min: 0,
  },
  TOTAL_VALUE: {
    required: true,
    type: 'number',
    min: 0,
  },
  PRICE_CHANGE: {
    required: true,
    type: 'number',
  },
  PRICE_CHANGE_PERCENTAGE: {
    required: true,
    type: 'number',
  },
  IS_GAINING: {
    required: true,
    type: 'boolean',
  },
} as const;

export const validatePortfolioId = (portfolioId: unknown): portfolioId is number => {
  return typeof portfolioId === 'number' && portfolioId > 0;
};

export const validatePortfolio = (data: unknown): data is { portfolioId: number } => {
  if (!data || typeof data !== 'object') return false;
  const portfolio = data as any;
  return validatePortfolioId(portfolio.portfolioId);
};

export const validatePortfolioData = (data: unknown): boolean => {
  if (!data || typeof data !== 'object') return false;

  const portfolio = data as any;
  return (
    typeof portfolio.portfolioId === 'number' &&
    portfolio.portfolioId > 0 &&
    typeof portfolio.balance === 'number' &&
    portfolio.balance >= 0 &&
    typeof portfolio.currentValue === 'number' &&
    portfolio.currentValue >= 0 &&
    portfolio.timestamp instanceof Date
  );
};

export const validatePortfolioPositionData = (data: unknown): boolean => {
  if (!data || typeof data !== 'object') return false;

  const position = data as any;
  return (
    validateETFId(position.id) &&
    typeof position.ticker === 'string' &&
    position.ticker.length > 0 &&
    position.ticker.length <= 10 &&
    PORTFOLIO_VALIDATION_RULES.TICKER.pattern.test(position.ticker) &&
    typeof position.name === 'string' &&
    position.name.length > 0 &&
    position.name.length <= 200 &&
    typeof position.quantity === 'number' &&
    position.quantity >= 0 &&
    typeof position.currentPrice === 'number' &&
    position.currentPrice >= 0 &&
    typeof position.totalValue === 'number' &&
    position.totalValue >= 0 &&
    typeof position.priceChange === 'number' &&
    typeof position.priceChangePercentage === 'number' &&
    typeof position.isGaining === 'boolean'
  );
};

export const validatePortfolioPositionsArray = (data: unknown): boolean => {
  if (!Array.isArray(data)) return false;
  return data.every(validatePortfolioPositionData);
};

export const validateTotalValue = (value: unknown): value is number => {
  return typeof value === 'number' && value >= 0;
};
