import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transactionService';

export class TransactionServiceAdapter implements TransactionService {
  async getTransactionsForUser(): Promise<Transaction[]> {
    return TransactionService.getTransactionsForUser();
  }
}
