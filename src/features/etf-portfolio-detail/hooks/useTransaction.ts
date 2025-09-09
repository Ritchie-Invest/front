import { useState, useCallback, useEffect } from 'react';
import { TransactionApiResponse } from '~/features/etf/models/Transaction';
import { TransactionHistoryServiceAdapter } from '../adapters/TransactionHistoryServiceAdapter';
import { TransactionType } from '~/features/etf/types/TransactionType';
import { colors } from '~/lib/theme/theme';

export const useTransactions = (limit?: number) => {
  const transactionService = new TransactionHistoryServiceAdapter();
  const [transactions, setTransactions] = useState<TransactionApiResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await transactionService.getTransactionsForUser(limit);
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, [limit]);

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

export const getTypeColor = (type: TransactionType) => {
  return type === TransactionType.Buy ? colors.warningBorderColor : colors.infoBorderColor;
};

export const getTypeSymbol = (type: TransactionType) => {
  return type === TransactionType.Buy ? '-' : '+';
};
