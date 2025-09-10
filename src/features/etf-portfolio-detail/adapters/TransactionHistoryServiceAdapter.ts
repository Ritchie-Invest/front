import { TransactionApiResponse } from '~/features/etf/models/Transaction';
import { TransactionHistoryService } from '../services/TransactionHistoryService';
import { validateTransactionApiResponses } from '../validation/TransactionValidation';

export class TransactionHistoryServiceAdapter {
  async getTransactionsForUser(limit?: number): Promise<TransactionApiResponse[]> {
    const data = await TransactionHistoryService.getTransactionsForUser(limit);

    if (!validateTransactionApiResponses(data)) {
      throw new Error('Invalid transaction data received from service');
    }

    return data;
  }
}
