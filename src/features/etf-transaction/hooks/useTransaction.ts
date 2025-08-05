import { useCallback } from 'react';
import { TransactionServiceAdapter } from '../adapters/TransactionServiceAdapter';
import { TransactionRequest } from '../models/requests';
import { TransactionResponse } from '../models/responses';
import { TransactionType } from '../types/TransactionType';
import { useConversion } from './useConversion';
import { useTransactionStore } from '../store/TransactionStore';

export interface UseTransactionReturn {
  isLoading: boolean;
  executeTransaction: (transactionRequest: TransactionRequest) => Promise<TransactionResponse>;
  handleTransaction: (transactionType: TransactionType) => Promise<TransactionResponse | null>;
}

export const useTransaction = (): UseTransactionReturn => {
  const { amount, shares, isValidAmount, selectedETF } = useConversion();
  const { isLoading, setLoading } = useTransactionStore();
  const transactionAdapter = new TransactionServiceAdapter();

  const executeTransaction = useCallback(
    async (transactionRequest: TransactionRequest): Promise<TransactionResponse> => {
      setLoading(true);

      try {
        const response = await transactionAdapter.executeTransaction(transactionRequest);
        return response;
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );

  const handleTransaction = useCallback(
    async (transactionType: TransactionType): Promise<TransactionResponse | null> => {
      if (!selectedETF) {
        throw new Error('Veuillez sélectionner un ETF');
      }

      if (!amount || amount.trim() === '') {
        throw new Error('Veuillez saisir un montant');
      }

      if (!isValidAmount) {
        throw new Error('Veuillez saisir un montant valide');
      }

      if (shares <= 0) {
        throw new Error("Le montant saisi ne permet pas d'acheter de parts");
      }

      const transactionRequest: TransactionRequest = {
        etfID: selectedETF.id,
        amount: parseFloat(amount),
        shares,
        transactionType,
      };

      return await executeTransaction(transactionRequest);
    },
    [isValidAmount, selectedETF, shares, amount, executeTransaction],
  );

  return {
    isLoading,
    executeTransaction,
    handleTransaction,
  };
};
