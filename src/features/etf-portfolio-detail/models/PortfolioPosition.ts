export interface PortfolioPosition {
  id: string;
  cash: number;
  investments: number;
  date: string;
}

export interface ApiResponse {
  positions: PortfolioPosition[];
  total: number;
}
