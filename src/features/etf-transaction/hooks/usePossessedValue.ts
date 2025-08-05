import { useState, useCallback, useEffect } from 'react';
import { PossessedValueServiceAdapter } from '../adapters/PossessedValueServiceAdapter';
import { PossessedValueRequest } from '../models/requests';
import { PossessedValueResponse } from '../models/responses';

export interface UsePossessedValueReturn {
  possessedValue: number;
  isLoading: boolean;
  error: string | null;
  fetchPossessedValue: (request: PossessedValueRequest) => void;
  clearError: () => void;
}

export const usePossessedValue = (): UsePossessedValueReturn => {
  const [possessedValue, setPossessedValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const possessedValueAdapter = new PossessedValueServiceAdapter();

  const fetchPossessedValue = useCallback(
    (request: PossessedValueRequest) => {
      setIsLoading(true);
      setError(null);

      try {
        const response: PossessedValueResponse = possessedValueAdapter.getPossessedValue(request);
        setPossessedValue(response.value);
      } catch (err) {
        console.error('[usePossessedValue] Erreur:', err);
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        setPossessedValue(0);
      } finally {
        setIsLoading(false);
      }
    },
    [possessedValueAdapter],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    possessedValue,
    isLoading,
    error,
    fetchPossessedValue,
    clearError,
  };
};
