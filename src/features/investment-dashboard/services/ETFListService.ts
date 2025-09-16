import { ETF } from '~/features/etf/models/ETF';
import { axiosInstance } from '~/lib/api/axios';

interface ApiResponse {
  tickers: ETF[];
}

export const ETFListService = {
  getAllETFs: async (): Promise<ETF[]> => {
    try {
      const response = await axiosInstance.get<ApiResponse>('/tickers');

      return response.data.tickers.filter((ticker) => ticker.type === 'ETF');
    } catch (error) {
      console.error('Failed to fetch ETFs from API:', error);
      throw new Error('Failed to fetch ETFs');
    }
  },
};
