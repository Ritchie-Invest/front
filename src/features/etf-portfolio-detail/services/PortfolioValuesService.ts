import { Portfolio } from '../../etf-portfolio/models/portfolio';

const mockPortfolioValues: Portfolio[] = [
  {
    portfolioId: 1,
    balance: 8000,
    currentValue: 22000,
    timestamp: new Date('2025-01-01'),
  },
  {
    portfolioId: 1,
    balance: 8500,
    currentValue: 23200,
    timestamp: new Date('2025-02-01'),
  },
  {
    portfolioId: 1,
    balance: 9000,
    currentValue: 24100,
    timestamp: new Date('2025-03-01'),
  },
  {
    portfolioId: 1,
    balance: 9200,
    currentValue: 24800,
    timestamp: new Date('2025-04-01'),
  },
  {
    portfolioId: 1,
    balance: 9500,
    currentValue: 25200,
    timestamp: new Date('2025-05-01'),
  },
  {
    portfolioId: 1,
    balance: 9800,
    currentValue: 24900,
    timestamp: new Date('2025-06-01'),
  },
  {
    portfolioId: 1,
    balance: 10000,
    currentValue: 25000,
    timestamp: new Date('2025-07-01'),
  },
];

export const portfolioValuesService = {
  getPortfolioValues: async (): Promise<Portfolio[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockPortfolioValues;
  },

  getPortfolioValuesByDateRange: async (startDate: Date, endDate: Date): Promise<Portfolio[]> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockPortfolioValues.filter(
      (portfolio) => portfolio.timestamp >= startDate && portfolio.timestamp <= endDate,
    );
  },

  getLatestPortfolioValue: async (): Promise<Portfolio | null> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const sortedValues = mockPortfolioValues.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
    );
    return sortedValues[0] || null;
  },
};
