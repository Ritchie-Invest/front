import {
  TransactionApiRequest,
  PostTransactionApiResponse,
} from '~/features/etf/models/Transaction';
import { axiosInstance } from '~/lib/api/axios';

export const TransactionService = {
  executeTransaction: async (
    request: TransactionApiRequest,
  ): Promise<PostTransactionApiResponse> => {
    try {
      const response = await axiosInstance.post<PostTransactionApiResponse>(
        '/transaction/execute',
        request,
        { withCredentials: true },
      );

      return response.data;
    } catch (error) {
      console.error('TransactionService error:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as any;
        console.error('Error response:', axiosError.response?.data);
        console.error('Error status:', axiosError.response?.status);
      }
      throw new Error('Failed to execute transaction');
    }
  },
};
