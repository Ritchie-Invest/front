import { TransactionRequest } from '../models/requests';
import { TransactionResponse } from '../models/responses';

export class TransactionService {
  static async executeTransaction(
    transactionRequest: TransactionRequest,
  ): Promise<TransactionResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (transactionRequest.amount <= 0 || transactionRequest.shares <= 0) {
      throw new Error('Montant ou nombre de parts invalide');
    }

    const isSuccess = Math.random() > 0.05;

    if (!isSuccess) {
      throw new Error('Erreur lors de la transaction');
    }

    return {
      status: 'success',
    };
  }
}
