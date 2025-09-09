import { TransactionType } from '../types/TransactionType';

export interface Transaction {
  type: TransactionType;
  volume: number;
  amount: number;
  timestamp: Date;
}

export interface TransactionApiRequest extends Transaction {
  tickerId: string;
}

export interface TransactionApiResponse extends Transaction {
  tickerName: string;
  tickerSymbol: string;
}
