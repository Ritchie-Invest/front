import { useState, useCallback, useEffect } from 'react';
import { Transaction } from '../index';
import { TransactionServiceAdapter } from '../adapters/TransactionServiceAdapter';

export const useTransactions = () => {
  const transactionService = new TransactionServiceAdapter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionService.getTransactionsForUser();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
  };
};

export const getTypeColor = (type: string) => {
  return type === 'BUY' ? 'red.500' : 'blue.500';
};

export const getTypeSymbol = (type: string) => {
  return type === 'BUY' ? '-' : '+';
};
