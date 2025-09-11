import { GetTransactionsApiResponse } from '~/features/etf/models/Transaction';
import { axiosInstance } from '~/lib/api/axios';

export class TransactionHistoryService {
  static async getTransactionsForUser(limit?: number): Promise<GetTransactionsApiResponse[]> {
    try {
      const response = await axiosInstance.get<{ transactions: GetTransactionsApiResponse[] }>(
        `/transaction/user?limit=${limit || 10}`,
      );
      console.debug('Fetched transactions:', response.data.transactions);
      return response.data.transactions;
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  }
}
