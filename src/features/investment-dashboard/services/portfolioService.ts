import { Portfolio, PortfolioPosition } from '../models/portfolio';
const mockPortfolio: Portfolio = {
  portfolioId: 1,
  balance: 10000,
  currentValue: 25000,
  timestamp: new Date('2025-07-19'),
};

const mockPositions: PortfolioPosition[] = [
  {
    id: '1',
    ticker: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    quantity: 10,
    currentPrice: 453.7,
    totalValue: 4537,
    priceChange: 2.4,
    priceChangePercentage: 0.53,
    isGaining: true,
  },
  {
    id: '2',
    ticker: 'QQQ',
    name: 'Invesco QQQ Trust',
    quantity: 15,
    currentPrice: 383.2,
    totalValue: 5748,
    priceChange: -1.6,
    priceChangePercentage: -0.42,
    isGaining: false,
  },
  {
    id: '3',
    ticker: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    quantity: 20,
    currentPrice: 247.8,
    totalValue: 4956,
    priceChange: 1.3,
    priceChangePercentage: 0.53,
    isGaining: true,
  },
];

export const portfolioService = {
  getPortfolio: async (): Promise<Portfolio> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    return mockPortfolio;
  },

  getPortfolioPositions: async (): Promise<PortfolioPosition[]> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    return mockPositions;
  },

  getTotalPortfolioValue: async (): Promise<number> => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    const positions = await portfolioService.getPortfolioPositions();
    const positionsValue = positions.reduce((sum, position) => sum + position.totalValue, 0);

    return mockPortfolio.balance + positionsValue;
  },
};
