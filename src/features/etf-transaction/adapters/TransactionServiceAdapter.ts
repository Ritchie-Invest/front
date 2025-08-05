import { TransactionService } from '../services/TransactionService';
import { TransactionContract } from '../contracts/TransactionContracts';
import { TransactionRequest } from '../models/requests';
import { TransactionResponse } from '../models/responses';
import { validateTransactionRequest } from '../validation/TransactionValidation';

export class TransactionServiceAdapter implements TransactionContract {
  async executeTransaction(transactionRequest: TransactionRequest): Promise<TransactionResponse> {
    if (!validateTransactionRequest(transactionRequest)) {
      throw new Error(
        `Invalid transaction request: ${JSON.stringify(transactionRequest)}. ` +
          'Must have valid amount, shares, etfID, and transaction type.',
      );
    }

    return TransactionService.executeTransaction(transactionRequest);
  }
}
