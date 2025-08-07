import { Transaction } from '~/features/etf/models/Transaction';
import { TransactionType } from '~/features/etf/types/TransactionType';

export class TransactionService {
  static async getTransactionsForUser(): Promise<Transaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: '1-2025-07-01-1',
        etfTicker: 'MSCI World',
        type: TransactionType.Buy,
        shares: 10,
        amount: 1200,
        date: new Date('2025-07-01T10:00:00Z'),
      },
      {
        id: '1-2025-07-10-2',
        etfTicker: 'MSCI World',
        type: TransactionType.Sell,
        shares: 5,
        amount: 800,
        date: new Date('2025-07-10T14:30:00Z'),
      },
      {
        id: '2-2025-07-15-3',
        etfTicker: 'S&P 500',
        type: TransactionType.Buy,
        shares: 2,
        amount: 500,
        date: new Date('2025-07-15T09:15:00Z'),
      },
    ];
  }
}
