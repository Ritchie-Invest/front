import { Transaction } from './Transaction';
import { TransactionStatus } from '../types/TransactionStatus';

export interface TransactionResponse {
  transaction: Transaction;
  price: number;
  fees: number;
  totalAmount: number;
  timestamp: Date;
  status: TransactionStatus;
}
