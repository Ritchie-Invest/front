import { basePortfolioInfos } from '~/features/etf-portfolio/models/portfolio';

export interface PortfolioPosition extends basePortfolioInfos {
  id: string;
  date: string;
}

export interface PortfolioHistoryResponse {
  positions: PortfolioPosition[];
  variation: number;
  variationPercent: number;
  variationDirection: string;
}
