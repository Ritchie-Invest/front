import { DateRangeType, DATE_RANGE_OPTIONS } from '~/components/molecules/types/dateRange';
import { ApiResponse } from '../models/PortfolioPosition';
import { axiosInstance } from '~/lib/api/axios';

export class PortfolioPositionsService {
  static async getPortfolioPositions(dateRange: DateRangeType): Promise<ApiResponse> {
    try {
      const limit = this.getLimitForDateRange(dateRange);
      const response = await axiosInstance.get<ApiResponse>(`/portfolio/positions?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch portfolio positions:', error);
      throw new Error('Failed to fetch portfolio positions');
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
