import { TransactionType } from '../types/TransactionType';

export interface Transaction {
  id: string;
  etfTicker: string;
  amount: number;
  shares: number;
  type: TransactionType;
  date: Date;
}
