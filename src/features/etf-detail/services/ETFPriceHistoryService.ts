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
      const limit = this.getLimitForDateRange(dateRange);

      const response = await axiosInstance.get<ETFWithPriceHistory>(
        `/tickers/${id}/history?limit=${limit}`,
      );

      const etfData = response.data;

      const history = etfData.history
        .map((data) => ({
          ...data,
          timestamp: new Date(data.timestamp),
        }))
        .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

      return {
        ...etfData,
        history,
      };
    } catch (error) {
      console.error('Failed to fetch ETF price history:', error);
      throw new Error('Failed to fetch ETF price history');
    }
  }

  private static getLimitForDateRange(dateRange: DateRangeType): number {
    const now = new Date();
    let startDate: Date;

    switch (dateRange) {
      case DateRangeType.SevenDays:
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case DateRangeType.OneMonth:
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case DateRangeType.SixMonths:
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 6);
        break;
      case DateRangeType.OneYear:
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
    }

    const diffTime = now.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
