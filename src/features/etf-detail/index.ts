export { ETFDetailScreen } from './screens/ETFDetailScreen';

export { ETFDetails } from './components/ETFDetails';
export { ETFStats } from './components/ETFStats';

export { useETFDetail, calculatePriceChange } from './hooks/useETFDetail';

export { ETFDetailService } from './services/etfDetailService';
export { ETFDetailServiceAdapter } from './adapters/etfDetailServiceAdapter';

export type { ETFPriceData, ETFWithPriceHistory } from './model/etfPriceData';
export type { DateRangeType } from '../../components/molecules/types/dateRange';
export { DATE_RANGE_OPTIONS } from '../../components/molecules/types/dateRange';

export {
  ETF_VALIDATION_RULES,
  validateETFId,
  validateDateRange,
  validatePriceData,
} from './validation/etfValidation';

export type {
  ETFDataService,
  ChartProvider,
  HeaderProvider,
} from './contracts/etfDetail.contracts';
