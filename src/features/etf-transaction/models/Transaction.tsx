import { TransactionType } from '../types/TransactionType';

export interface Transaction {
  etfID: number;
  ticker: string;
  currentPrice: number;
  transactionType: TransactionType;
}
