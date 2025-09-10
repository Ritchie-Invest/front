import { CurrencyType } from '~/features/etf/types/CurrencyType';

export interface Portfolio {
  currency: CurrencyType;
  cash: number;
  investments: number;
  totalValue: number;
}

export interface PortfolioPosition {
  id: string;
  etfId: string;
  ticker: string;
  name: string;
  quantity: number;
  currentPrice: number;
  totalValue: number;
  priceChange: number;
  priceChangePercentage: number;
  isGaining: boolean;
}
