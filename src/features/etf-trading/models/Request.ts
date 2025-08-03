import { Transaction } from './Transaction';

export interface TransactionRequest extends Transaction {
  price: number;
  estimatedFees: number;
}
