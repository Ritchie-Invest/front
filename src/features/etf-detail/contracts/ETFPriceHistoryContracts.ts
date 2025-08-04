export interface ETFDataService {
  getETFWithPriceHistory(etfId: string, dateRange: string): Promise<any>;
}

export interface ChartProvider {
  (data: any[]): React.ReactNode;
}

export interface HeaderProvider {
  (etfData: any): React.ReactNode;
}
