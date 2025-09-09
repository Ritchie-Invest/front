import { TransactionApiResponse } from '~/features/etf/models/Transaction';
import { TransactionType } from '~/features/etf/types/TransactionType';

export const validateTransactionType = (type: unknown): type is TransactionType => {
  return typeof type === 'string' && (type === 'buy' || type === 'sell');
};

export const validateTransactionApiResponse = (data: unknown): data is TransactionApiResponse => {
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
): data is TransactionApiResponse[] => {
  if (!Array.isArray(data)) return false;
  return data.every(validateTransactionApiResponse);
};
