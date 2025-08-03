import { TransactionType } from '../types/Transaction';

export interface Transaction {
  quantity: number;
  etfId: number;
  userId: string;
  type: TransactionType;
}
