import { useState, useCallback } from 'react';
import { TransactionServiceAdapter } from '../adapters/TransactionServiceAdapter';
import { TransactionRequest } from '../models/requests';
import { TransactionType } from '../types/TransactionType';
import { useConversion } from './useConversion';
import { useTransactionStore } from '../store/TransactionStore';

export interface UseTransactionReturn {
  isLoading: boolean;
  message: string | null;
  messageType: boolean | null;
  executeTransaction: (transactionRequest: TransactionRequest) => Promise<void>;
  handleTransaction: (transactionType: TransactionType) => Promise<void>;
  clearMessage: () => void;
}

export const useTransaction = (): UseTransactionReturn => {
  const { amount, shares, isValidAmount, selectedETF } = useConversion();
  const { isLoading, message, messageType, setLoading, setMessage, clearMessage } =
    useTransactionStore();
  const transactionAdapter = new TransactionServiceAdapter();

  const executeTransaction = useCallback(
    async (transactionRequest: TransactionRequest) => {
      setLoading(true);
      setMessage(null, null);

      try {
        const response = await transactionAdapter.executeTransaction(transactionRequest);

        if (response.status === 'success') {
          const actionText =
            transactionRequest.transactionType === TransactionType.Buy ? 'Achat' : 'Vente';
          setMessage(`${actionText} réalisé avec succès !`, true);
        }
      } catch (error) {
        setMessage(error instanceof Error ? error.message : 'Une erreur est survenue', false);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setMessage],
  );

  const handleTransaction = useCallback(
    async (transactionType: TransactionType) => {
      if (!selectedETF) {
        setMessage('Veuillez sélectionner un ETF', false);
        return;
      }

      if (!amount || amount.trim() === '') {
        setMessage('Veuillez saisir un montant', false);
        return;
      }

      if (!isValidAmount) {
        setMessage('Veuillez saisir un montant valide', false);
        return;
      }

      if (shares <= 0) {
        setMessage("Le montant saisi ne permet pas d'acheter de parts", false);
        return;
      }

      const transactionRequest: TransactionRequest = {
        etfID: selectedETF.id,
        amount: parseFloat(amount),
        shares,
        transactionType,
      };

      await executeTransaction(transactionRequest);
    },
    [isValidAmount, selectedETF, shares, amount, executeTransaction, setMessage],
  );

  return {
    isLoading,
    message,
    messageType,
    executeTransaction,
    handleTransaction,
    clearMessage,
  };
};
