import {
  PostTransactionApiResponse,
  TransactionApiRequest,
} from '~/features/etf/models/Transaction';

export const validateTransactionRequest = (request: TransactionApiRequest): boolean => {
  return (
    typeof request.tickerId === 'string' &&
    request.tickerId.trim() !== '' &&
    (request.type === 'BUY' || request.type === 'SELL') &&
    typeof request.amount === 'number' &&
    request.amount > 0
  );
};

export const validateTransactionResponse = (response: PostTransactionApiResponse): boolean => {
  return (
    typeof response.cash === 'number' &&
    typeof response.investments === 'number' &&
    typeof response.tickerHoldings === 'number'
  );
};
