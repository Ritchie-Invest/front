import { CurrencyType } from '../types/CurrencyType';
import { TickerType } from '../types/TickerType';
import { VariationType } from '../types/VariationType';

export interface ETF {
  id: string;
  name: string;
  symbol: string;
  type: TickerType;
  currency: CurrencyType;
  price: number;
  variation: number;
  variationPercent: number;
  variationDirection: VariationType;
}
