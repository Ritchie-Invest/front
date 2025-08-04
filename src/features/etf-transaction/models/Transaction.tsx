import { TransactionType } from '../types/TransactionType';

export interface Transaction {
  etfID: number;
  transactionType: TransactionType;
}
