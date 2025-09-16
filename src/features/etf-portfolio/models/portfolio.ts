import { CurrencyType } from '~/features/etf/types/CurrencyType';

export interface basePortfolioInfos {
  cash: number;
  investments: number;
}
export interface Portfolio extends basePortfolioInfos {
  currency: CurrencyType;
  totalValue: number;
}
