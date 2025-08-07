import { DateRangeType } from '~/components/molecules/types/dateRange';
import { ETFWithPriceHistory } from './ETFPriceData';

export interface ETFStaticData {
  ticker: string;
  name: string;
  currentPrice: number;
}

export interface ETFDetailState {
  etfId: number | null;
  selectedRange: DateRangeType;
  etfData: ETFWithPriceHistory | null;
  staticData: ETFStaticData | null;
  loading: boolean;
  error: string | null;
  setETFId: (etfId: number) => void;
  setSelectedRange: (range: DateRangeType) => void;
  fetchETFData: () => Promise<void>;
  reset: () => void;
}
