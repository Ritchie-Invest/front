import { ETFWithCurrentPrice } from '~/features/etf/models/ETFWithCurrentPrice';

const mockETFs: ETFWithCurrentPrice[] = [
  {
    id: '1',
    ticker: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    currentPrice: 400,
    priceChangePercentage: 1.2,
    isGaining: true,
  },
  {
    id: '2',
    ticker: 'QQQ',
    name: 'Invesco QQQ Trust',
    currentPrice: 300,
    priceChangePercentage: 0.8,
    isGaining: true,
  },
  {
    id: '3',
    ticker: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    currentPrice: 200,
    priceChangePercentage: 0.5,
    isGaining: true,
  },
];

export const ETFListService = {
  getAllETFs: async (): Promise<ETFWithCurrentPrice[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return mockETFs.map((etf) => ({
      ...etf,
      currentPrice: etf.currentPrice,
      priceChangePercentage: etf.priceChangePercentage,
      isGaining: etf.isGaining,
    }));
  },
};
