import { TransactionType } from '../types/TransactionType';

export interface Transaction {
  amount: number;
  shares: number;
  transactionType: TransactionType;
}
