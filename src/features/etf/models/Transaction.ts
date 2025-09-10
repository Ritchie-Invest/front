import { TransactionType } from '../types/TransactionType';

export interface Transaction {
  type: TransactionType;
  amount: number;
}

export interface TransactionApiRequest extends Transaction {
  tickerId: string;
}

export interface PostTransactionApiResponse {
  cash: number;
  investments: number;
  tickerHoldings: number;
}

export interface GetTransactionsApiResponse extends Transaction {
  tickerName: string;
  tickerSymbol: string;
  volume: number;
  timestamp: Date;
}
