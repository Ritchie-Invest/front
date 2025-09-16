import {
  TransactionApiRequest,
  PostTransactionApiResponse,
  GetTransactionsApiResponse,
} from '../models/Transaction';
import { TransactionType } from '../types/TransactionType';

export const TRANSACTION_VALIDATION_RULES = {
  AMOUNT: {
    required: true,
    type: 'number',
    min: 0.01,
    max: 1000000,
  },
  VOLUME: {
    required: true,
    type: 'number',
    min: 0.0001,
    max: 1000000,
  },
  ETF_ID: {
    required: true,
    type: 'string',
    minLength: 1,
  },
  TRANSACTION_TYPE: {
    required: true,
    validValues: Object.values(TransactionType),
  },
} as const;

export const validateAmount = (amount: unknown): amount is number => {
  return (
    typeof amount === 'number' &&
    !isNaN(amount) &&
    amount >= TRANSACTION_VALIDATION_RULES.AMOUNT.min &&
    amount <= TRANSACTION_VALIDATION_RULES.AMOUNT.max
  );
};

export const validateVolume = (volume: unknown): volume is number => {
  return (
    typeof volume === 'number' &&
    !isNaN(volume) &&
    volume >= TRANSACTION_VALIDATION_RULES.VOLUME.min &&
    volume <= TRANSACTION_VALIDATION_RULES.VOLUME.max
  );
};

export const validateTransactionType = (
  transactionType: unknown,
): transactionType is TransactionType => {
  return TRANSACTION_VALIDATION_RULES.TRANSACTION_TYPE.validValues.includes(
    transactionType as TransactionType,
  );
};

export const validateTickerId = (tickerId: unknown): tickerId is string => {
  return (
    typeof tickerId === 'string' && tickerId.length >= TRANSACTION_VALIDATION_RULES.ETF_ID.minLength
  );
};

export const validateTransactionRequest = (request: TransactionApiRequest): boolean => {
  if (!request || typeof request !== 'object') return false;

  return (
    validateAmount(request.amount) &&
    validateVolume(request.volume) &&
    validateTransactionType(request.type) &&
    validateTickerId(request.tickerId)
  );
};

export const validatePostTransactionResponse = (response: PostTransactionApiResponse): boolean => {
  if (!response || typeof response !== 'object') return false;

  return (
    typeof response.cash === 'number' &&
    typeof response.investments === 'number' &&
    typeof response.tickerHoldings === 'number'
  );
};

export const validateGetTransactionsResponse = (response: GetTransactionsApiResponse): boolean => {
  if (!response || typeof response !== 'object') return false;

  return (
    validateAmount(response.amount) &&
    validateVolume(response.volume) &&
    validateTransactionType(response.type) &&
    typeof response.tickerName === 'string' &&
    typeof response.tickerSymbol === 'string' &&
    response.timestamp instanceof Date
  );
};
