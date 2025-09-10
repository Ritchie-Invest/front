import { TransactionContract } from '../contracts/TransactionContract';
import { TransactionService } from '../services/TransactionService';
import {
  TransactionApiRequest,
  PostTransactionApiResponse,
} from '~/features/etf/models/Transaction';
import {
  validateTransactionRequest,
  validateTransactionResponse,
} from '../validation/TransactionValidation';

export class TransactionServiceAdapter implements TransactionContract {
  async executeTransaction(request: TransactionApiRequest): Promise<PostTransactionApiResponse> {
    const response = await TransactionService.executeTransaction(request);

    if (!validateTransactionRequest(request)) {
      throw new Error('Invalid transaction request');
    }

    if (!validateTransactionResponse(response)) {
      throw new Error('Invalid transaction response received from service');
    }

    return response;
  }
}
