import { ETFWithPriceHistory } from '../models/ETFPriceHistory';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import { DATE_RANGE_OPTIONS } from '~/components/molecules/types/dateRange';
import { axiosInstance } from '~/lib/api/axios';
import { VariationType } from '~/features/etf/types/VariationType';

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

      let variation = 0;
      let variationPercent = 0;
      let variationDirection = VariationType.FLAT;

      if (history.length >= 2) {
        const firstPrice = history[0].close;
        const lastPrice = history[history.length - 1].close;
        variation = lastPrice - firstPrice;
        variationPercent = (variation / firstPrice) * 100;

        if (variation > 0) {
          variationDirection = VariationType.UP;
        } else if (variation < 0) {
          variationDirection = VariationType.DOWN;
        }
      }

      return {
        ...etfData,
        history,
        variation,
        variationPercent,
        variationDirection,
      };
    } catch (error) {
      console.error('Failed to fetch ETF price history:', error);
      throw new Error('Failed to fetch ETF price history');
    }
  }
}
