import { ETF, ETFWithCurrentPrice } from '../models/etf';

// Mock data à remplacer par les vrais services
const mockETFs: ETF[] = [
  {
    etfID: 1,
    ticker: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    priceHistory: [
      {
        open: 450.2,
        high: 452.8,
        low: 448.5,
        close: 451.3,
        volume: 1500000,
        timestamp: new Date('2025-07-18'),
      },
      {
        open: 451.3,
        high: 454.1,
        low: 450.8,
        close: 453.7,
        volume: 1200000,
        timestamp: new Date('2025-07-19'),
      },
    ],
  },
  {
    etfID: 2,
    ticker: 'QQQ',
    name: 'Invesco QQQ Trust',
    priceHistory: [
      {
        open: 385.5,
        high: 387.2,
        low: 383.1,
        close: 384.8,
        volume: 2100000,
        timestamp: new Date('2025-07-18'),
      },
      {
        open: 384.8,
        high: 386.5,
        low: 382.3,
        close: 383.2,
        volume: 1800000,
        timestamp: new Date('2025-07-19'),
      },
    ],
  },
  {
    etfID: 3,
    ticker: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    priceHistory: [
      {
        open: 245.1,
        high: 246.8,
        low: 244.2,
        close: 246.5,
        volume: 900000,
        timestamp: new Date('2025-07-18'),
      },
      {
        open: 246.5,
        high: 248.3,
        low: 245.9,
        close: 247.8,
        volume: 750000,
        timestamp: new Date('2025-07-19'),
      },
    ],
  },
];

const calculateETFWithCurrentPrice = (etf: ETF): ETFWithCurrentPrice => {
  const currentPrice = etf.priceHistory[etf.priceHistory.length - 1].close;
  const previousPrice = etf.priceHistory[etf.priceHistory.length - 2].close;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercentage = (priceChange / previousPrice) * 100;

  return {
    ...etf,
    currentPrice,
    previousPrice,
    priceChange,
    priceChangePercentage,
    isGaining: priceChange >= 0,
  };
};

export const etfService = {
  getAllETFs: async (): Promise<ETFWithCurrentPrice[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return mockETFs.map(calculateETFWithCurrentPrice);
  },

  getETFById: async (id: number): Promise<ETFWithCurrentPrice | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const etf = mockETFs.find((e) => e.etfID === id);
    return etf ? calculateETFWithCurrentPrice(etf) : null;
  },
};
