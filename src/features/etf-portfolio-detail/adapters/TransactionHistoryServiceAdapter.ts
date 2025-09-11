import { GetTransactionsApiResponse } from '~/features/etf/models/Transaction';
import { TransactionHistoryService } from '../services/TransactionHistoryService';
import { validateTransactionApiResponses } from '../validation/TransactionValidation';

export class TransactionHistoryServiceAdapter {
  private mapTimestampToDate(timestamp: string): Date {
    return new Date(timestamp);
  }

  async getTransactionsForUser(limit?: number): Promise<GetTransactionsApiResponse[]> {
    const data = await TransactionHistoryService.getTransactionsForUser(limit);

    const mappedData = data.map((transaction: any) => ({
      ...transaction,
      timestamp: this.mapTimestampToDate(transaction.timestamp),
    }));

    if (!validateTransactionApiResponses(mappedData)) {
      console.error('Invalid transaction data received from service:', mappedData);
      throw new Error('Invalid transaction data received from service');
    }

    return mappedData;
  }
}
