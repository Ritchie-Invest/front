import { UserPossessedETFListItem } from '../models/UserPossessedETF';
import { axiosInstance } from '~/lib/api/axios';

interface ApiResponse {
  tickers: UserPossessedETFListItem[];
}

export const UserETFListService = {
  getAllUserETFs: async (): Promise<UserPossessedETFListItem[]> => {
    try {
      const response = await axiosInstance.get<ApiResponse>('/tickers/owned');
      return response.data.tickers;
    } catch (error) {
      console.error('Failed to fetch ETFs from API:', error);
      throw new Error('Failed to fetch ETFs');
    }
  },
};
