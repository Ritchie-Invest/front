import { DateRangeType, DATE_RANGE_OPTIONS } from '~/components/molecules/types/dateRange';
import { ApiResponse } from '../models/PortfolioPosition';
import { axiosInstance } from '~/lib/api/axios';

export class PortfolioPositionsService {
  static async getPortfolioPositions(dateRange: DateRangeType): Promise<ApiResponse> {
    try {
      const dateRangeOption = DATE_RANGE_OPTIONS.find((option) => option.value === dateRange);
      const limit = dateRangeOption?.days ?? 30;
      const response = await axiosInstance.get<ApiResponse>(`/portfolio/positions?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch portfolio positions:', error);
      throw new Error('Failed to fetch portfolio positions');
    }
  }
}
