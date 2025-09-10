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

  console.log('useTransactionForm initialized');
  console.log('Route params:', route.params);
  console.log('Transaction type:', transactionType);
  console.log('Selected ETF:', selectedETF);

  const [amount, setAmount] = useState<number | null>(null);
  const { executeTransaction, loading, error, response } = useTransaction();

  const handleAmountChange = (value: string) => {
    console.log('handleAmountChange called with value:', value, 'type:', typeof value);
    const numericValue = parseFloat(value);
    console.log('Parsed numeric value:', numericValue, 'isNaN:', isNaN(numericValue));
    setAmount(isNaN(numericValue) ? null : numericValue);
    console.log('Amount set to:', isNaN(numericValue) ? null : numericValue);
  };

  const handleSubmit = () => {
    console.log('handleSubmit called');
    console.log('Current amount:', amount, 'type:', typeof amount);
    console.log('Submitting transaction with amount:', amount);
    const numericAmount = amount;
    console.log(
      'numericAmount:',
      numericAmount,
      'is valid:',
      numericAmount !== null && numericAmount > 0,
    );
    if (numericAmount === null || numericAmount <= 0) {
      console.log('Amount is invalid, returning early');
      return;
    }

    console.log('Calling executeTransaction with:', numericAmount, transactionType);
    executeTransaction(numericAmount, transactionType);
  };

  const isBuy = transactionType === TransactionType.BUY;
  const buttonText = isBuy ? 'Acheter' : 'Vendre';
  const buttonVariant: ButtonVariant = isBuy ? 'primary' : 'secondary';
  const isAmountValid = amount !== null && amount > 0;
  const finalVariant: ButtonVariant = !isAmountValid ? 'disabled' : buttonVariant;

  console.log('Computed values:');
  console.log('isBuy:', isBuy);
  console.log('buttonText:', buttonText);
  console.log('buttonVariant:', buttonVariant);
  console.log('isAmountValid:', isAmountValid);
  console.log('finalVariant:', finalVariant);

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
    console.log(
      'executeTransaction called with amount:',
      amount,
      'type:',
      typeof amount,
      'transactionType:',
      transactionType,
    );
    if (!selectedETF) {
      console.log('No ETF selected');
      setError('Aucun ETF sélectionné');
      return;
    }

    try {
      console.log('Starting transaction execution');
      setLoading(true);
      setError(null);
      setResponse(null);

      const request: TransactionApiRequest = {
        type: transactionType,
        amount,
        tickerId: selectedETF.id,
      };
      console.log('Request object:', request);

      const adapter = new TransactionServiceAdapter();
      console.log('Calling adapter.executeTransaction');
      const result = await adapter.executeTransaction(request);
      console.log('Transaction result:', result);
      setResponse(result);
    } catch (err) {
      console.log('Transaction error:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      console.log('Transaction execution finished');
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
