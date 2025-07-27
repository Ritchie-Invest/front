import { Transaction } from '../index';
import { TransactionService } from '../index';

export class TransactionServiceAdapter implements TransactionService {
  async getTransactionsForUser(userId: number): Promise<Transaction[]> {
    return TransactionService.getTransactionsForUser(userId);
  }
}
