import { useState } from 'react';
import { TransactionServiceAdapter } from '../adapters/TransactionServiceAdapter';
import {
  TransactionApiRequest,
  PostTransactionApiResponse,
} from '~/features/etf/models/Transaction';
import { TransactionType } from '../types/TransactionType';
import { useSelectedETF } from '~/features/etf/store/ETFStore';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '~/navigation/AppNavigator';

type ETFTransactionRouteProp = RouteProp<MainStackParamList, 'ETFTransaction'>;

type ButtonVariant = 'primary' | 'secondary' | 'disabled';

export const useTransactionForm = () => {
  const route = useRoute<ETFTransactionRouteProp>();
  const { transactionType } = route.params;
  const selectedETF = useSelectedETF();

  const [amount, setAmount] = useState<number | null>(null);
  const { executeTransaction, loading, error, response } = useTransaction();

  const handleAmountChange = (value: string) => {
    const numericValue = parseFloat(value);
    setAmount(isNaN(numericValue) ? null : numericValue);
  };

  const handleSubmit = () => {
    const numericAmount = amount;

    if (numericAmount === null || numericAmount <= 0) {
      return;
    }

    executeTransaction(numericAmount, transactionType);
  };

  const isBuy = transactionType === TransactionType.BUY;
  const buttonText = isBuy ? 'Acheter' : 'Vendre';
  const buttonVariant: ButtonVariant = isBuy ? 'primary' : 'secondary';
  const isAmountValid = amount !== null && amount > 0;
  const finalVariant: ButtonVariant = !isAmountValid ? 'disabled' : buttonVariant;

  return {
    amount,
    setAmount: handleAmountChange,
    handleSubmit,
    isBuy,
    buttonText,
    buttonVariant,
    isAmountValid,
    finalVariant,
    selectedETF,
    loading,
    error,
    response,
  };
};

export const useTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<PostTransactionApiResponse | null>(null);
  const selectedETF = useSelectedETF();

  const executeTransaction = async (amount: number, transactionType: TransactionType) => {
    if (!selectedETF) {
      setError('Aucun ETF sélectionné');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResponse(null);

      const request: TransactionApiRequest = {
        type: transactionType,
        amount,
        tickerId: selectedETF.id,
      };

      const adapter = new TransactionServiceAdapter();
      const result = await adapter.executeTransaction(request);
      setResponse(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setResponse(null);
  };

  return {
    executeTransaction,
    loading,
    error,
    response,
    reset,
    selectedETF,
  };
};
