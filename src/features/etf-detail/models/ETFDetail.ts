import { DateRangeType } from '~/components/molecules/types/dateRange';
import { ETFWithPriceHistory } from './ETFPriceHistory';

export interface ETFStaticData {
  ticker: string;
  name: string;
  currentPrice: number;
}

export interface ETFDetailState {
  etfId: string | null;
  selectedRange: DateRangeType;
  etfData: ETFWithPriceHistory | null;
  staticData: ETFStaticData | null;
  loading: boolean;
  error: string | null;
  setETFId: (etfId: string) => void;
  setSelectedRange: (range: DateRangeType) => void;
  fetchETFData: () => Promise<void>;
  reset: () => void;
}
