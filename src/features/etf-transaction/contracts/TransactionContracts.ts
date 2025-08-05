import { TransactionRequest } from '../models/requests';
import { TransactionResponse } from '../models/responses';

export interface TransactionContract {
  executeTransaction(transactionRequest: TransactionRequest): Promise<TransactionResponse>;
}
