import { TransactionRequest } from '../models/requests';
import { validateETFId } from '~/features/etf/validation/ETFValidation';
import { TransactionType } from '../types/TransactionType';

export const TRANSACTION_VALIDATION_RULES = {
  AMOUNT: {
    required: true,
    type: 'number',
    min: 0.01,
    max: 1000000,
  },
  SHARES: {
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

export const validateShares = (shares: unknown): shares is number => {
  return (
    typeof shares === 'number' &&
    !isNaN(shares) &&
    shares >= TRANSACTION_VALIDATION_RULES.SHARES.min &&
    shares <= TRANSACTION_VALIDATION_RULES.SHARES.max
  );
};

export const validateTransactionType = (
  transactionType: unknown,
): transactionType is TransactionType => {
  return TRANSACTION_VALIDATION_RULES.TRANSACTION_TYPE.validValues.includes(
    transactionType as TransactionType,
  );
};

export const validateTransactionRequest = (request: TransactionRequest): boolean => {
  if (!request || typeof request !== 'object') return false;

  return (
    validateAmount(request.amount) &&
    validateShares(request.shares) &&
    validateETFId(request.etfID) &&
    validateTransactionType(request.transactionType)
  );
};
