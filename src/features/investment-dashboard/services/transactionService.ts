import { Transaction, OperationType } from '../../transaction-history/model/transaction';

export class TransactionService {
  static async getTransactionsForUser(userId: number): Promise<Transaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Mock data
    return [
      {
        etfId: 1,
        userId,
        transactionValue: 1200,
        operationType: 'Buy',
        quantity: 10,
        date: new Date('2025-07-01T10:00:00Z'),
      },
      {
        etfId: 1,
        userId,
        transactionValue: 800,
        operationType: 'Sell',
        quantity: 5,
        date: new Date('2025-07-10T14:30:00Z'),
      },
      {
        etfId: 2,
        userId,
        transactionValue: 500,
        operationType: 'Buy',
        quantity: 2,
        date: new Date('2025-07-15T09:15:00Z'),
      },
    ];
  }
}
