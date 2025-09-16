import { GetTransactionsApiResponse } from '~/features/etf/models/Transaction';
import { TransactionType } from '~/features/etf/types/TransactionType';

export const validateTransactionType = (type: unknown): type is TransactionType => {
  return typeof type === 'string' && (type === 'BUY' || type === 'SELL');
};

export const validateTransactionApiResponse = (
  data: unknown,
): data is GetTransactionsApiResponse => {
  if (!data || typeof data !== 'object') return false;
  const trans = data as any;
  return (
    validateTransactionType(trans.type) &&
    typeof trans.volume === 'number' &&
    typeof trans.amount === 'number' &&
    trans.timestamp instanceof Date &&
    typeof trans.tickerName === 'string' &&
    typeof trans.tickerSymbol === 'string'
  );
};

export const validateTransactionApiResponses = (
  data: unknown,
): data is GetTransactionsApiResponse[] => {
  if (!Array.isArray(data)) return false;
  return data.every(validateTransactionApiResponse);
};
