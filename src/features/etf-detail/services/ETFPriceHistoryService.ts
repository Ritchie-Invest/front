import { ETFWithPriceHistory } from '../models/ETFPriceHistory';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import { DATE_RANGE_OPTIONS } from '~/components/molecules/types/dateRange';
import { axiosInstance } from '~/lib/api/axios';

export class ETFPriceHistoryService {
  static async getETFWithPriceHistory(
    id: string,
    dateRange: DateRangeType,
  ): Promise<ETFWithPriceHistory> {
    try {
      const dateRangeOption = DATE_RANGE_OPTIONS.find((option) => option.value === dateRange);
      const limit = dateRangeOption?.days ?? 30;

      const response = await axiosInstance.get<ETFWithPriceHistory>(
        `/tickers/${id}/history?limit=${limit}`,
      );

      const etfData = response.data;

      const history = etfData.history.map((data) => ({
        ...data,
        timestamp: new Date(data.timestamp),
      }));

      return {
        ...etfData,
        history,
      };
    } catch (error) {
      console.error('Failed to fetch ETF price history:', error);
      throw new Error('Failed to fetch ETF price history');
    }
  }
}
