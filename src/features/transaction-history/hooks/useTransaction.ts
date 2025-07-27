import { useState, useCallback, useEffect } from 'react';
import { Transaction, TransactionService } from '../index';

import { useAuthStore } from '../../auth/store/authStore';

export const useTransactions = (transactionService: TransactionService) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((s) => s.user);

  const fetchTransactions = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await transactionService.getTransactionsForUser(user.id);
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, [user, transactionService]);

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
