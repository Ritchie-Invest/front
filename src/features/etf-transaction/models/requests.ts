import { Transaction } from './Transaction';

export interface TransactionRequest extends Transaction {
  etfID: string;
}

export interface ConversionRequest {
  euroAmount: number;
  etfId: string;
}

export interface PossessedValueRequest {
  etfId: string;
}
