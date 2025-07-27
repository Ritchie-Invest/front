import { Transaction, OperationType } from '../index';

export class TransactionService {
  static async getTransactionsForUser(userId: number): Promise<Transaction[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: '1-2025-07-01-1',
        assetName: 'MSCI World',
        type: 'BUY' as OperationType,
        quantity: 10,
        value: 1200,
        date: new Date('2025-07-01T10:00:00Z'),
      },
      {
        id: '1-2025-07-10-2',
        assetName: 'MSCI World',
        type: 'SELL' as OperationType,
        quantity: 5,
        value: 800,
        date: new Date('2025-07-10T14:30:00Z'),
      },
      {
        id: '2-2025-07-15-3',
        assetName: 'S&P 500',
        type: 'BUY' as OperationType,
        quantity: 2,
        value: 500,
        date: new Date('2025-07-15T09:15:00Z'),
      },
    ];
  }
}
