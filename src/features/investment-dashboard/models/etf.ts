export interface ETFPriceData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  timestamp: Date;
}

export interface ETF {
  etfID: number;
  ticker: string;
  name: string;
  priceHistory: ETFPriceData[];
}

export interface ETFWithCurrentPrice extends ETF {
  currentPrice: number;
  previousPrice: number;
  priceChange: number;
  priceChangePercentage: number;
  isGaining: boolean;
}
