import {
  TransactionApiRequest,
  PostTransactionApiResponse,
} from '~/features/etf/models/Transaction';

export interface TransactionContract {
  executeTransaction(request: TransactionApiRequest): Promise<PostTransactionApiResponse>;
}

export interface TransactionProvider {
  (request: TransactionApiRequest): Promise<PostTransactionApiResponse>;
}
