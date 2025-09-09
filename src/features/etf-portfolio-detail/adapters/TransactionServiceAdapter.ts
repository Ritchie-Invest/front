import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/TransactionHistoryService';

export class TransactionServiceAdapter implements TransactionService {
  async getTransactionsForUser(): Promise<Transaction[]> {
    return TransactionService.getTransactionsForUser();
  }
}
