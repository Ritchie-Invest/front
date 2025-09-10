import { UserPossessedETF } from '~/features/etf/models/UserPossessedETF';
import { axiosInstance } from '~/lib/api/axios';

interface ApiResponse {
  tickers: UserPossessedETF[];
}

export const UserETFListService = {
  getAllUserETFs: async (): Promise<UserPossessedETF[]> => {
    try {
      const response = await axiosInstance.get<ApiResponse>('/tickers/owned');

      return response.data.tickers;
    } catch (error) {
      console.error('Failed to fetch ETFs from API:', error);
      throw new Error('Failed to fetch ETFs');
    }
  },
};
