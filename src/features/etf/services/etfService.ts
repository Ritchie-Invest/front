import { ETF } from '~/models/etf';
import { ETFWithCurrentPrice } from '../models/ETF';

const mockETFs: ETF[] = [
  {
    etfID: '1',
    ticker: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
  },
  {
    etfID: '2',
    ticker: 'QQQ',
    name: 'Invesco QQQ Trust',
  },
  {
    etfID: '3',
    ticker: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
  },
];

const calculateETFWithCurrentPrice = (etf: ETF): ETFWithCurrentPrice => {
  const basePrice = 100 + Math.random() * 300;
  const variation = (Math.random() - 0.5) * 0.1;
  const currentPrice = Math.round((basePrice + basePrice * variation) * 100) / 100;

  const previousPrice = Math.round((basePrice - basePrice * 0.02) * 100) / 100;
  const priceChange = currentPrice - previousPrice;
  const priceChangePercentage = (priceChange / previousPrice) * 100;

  return {
    ...etf,
    currentPrice,
    priceChangePercentage: Math.round(priceChangePercentage * 100) / 100,
    isGaining: priceChange >= 0,
  };
};

export const ETFService = {
  getAllETFs: async (): Promise<ETFWithCurrentPrice[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return mockETFs.map(calculateETFWithCurrentPrice);
  },
};
