export interface Portfolio {
  portfolioId: number;
  balance: number;
  currentValue: number;
  timestamp: Date;
}

export interface PortfolioPosition {
  etfId: number;
  ticker: string;
  name: string;
  quantity: number;
  currentPrice: number;
  totalValue: number;
  priceChange: number;
  priceChangePercentage: number;
  isGaining: boolean;
}
