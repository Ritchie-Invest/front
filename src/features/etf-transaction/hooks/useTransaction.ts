import { useState } from 'react';
import { TransactionServiceAdapter } from '../adapters/TransactionServiceAdapter';
import { TransactionApiRequest } from '~/features/etf/models/Transaction';
import { TransactionType } from '../types/TransactionType';
import { useSelectedETF } from '~/features/etf/store/ETFStore';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { MainStackParamList } from '~/navigation/AppNavigator';
import { useTransactionStore } from '../store/TransactionStore';
import { useConversion } from './useConversion';
import { Screens } from '~/features/navigation/Type/Screens';

type ETFTransactionRouteProp = RouteProp<MainStackParamList, 'ETFTransaction'>;

type ButtonVariant = 'primary' | 'secondary' | 'disabled';

export const useTransactionForm = () => {
  const route = useRoute<ETFTransactionRouteProp>();
  const { transactionType } = route.params;
  const selectedETF = useSelectedETF();

  const [amount, setAmount] = useState<number | null>(null);
  const { executeTransaction, loading, error, response } = useTransaction();
  const { shares, isValidAmount: conversionValid } = useConversion(amount || 0);

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
    shares,
  };
};

export const useTransaction = () => {
  const [localError, setLocalError] = useState<string | null>(null);
  const selectedETF = useSelectedETF();
  const navigation = useNavigation();
  const {
    isLoading,
    setLoading,
    error,
    setError,
    response,
    setResponse,
    resetResponse,
    clearTransaction,
  } = useTransactionStore();

  const executeTransaction = async (amount: number, transactionType: TransactionType) => {
    if (!selectedETF) {
      const err = 'Aucun ETF sélectionné';
      setError(err);
      setLocalError(err);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setLocalError(null);
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
      const errorMsg = err instanceof Error ? err.message : 'Une erreur est survenue';
      setError(errorMsg);
      setLocalError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    resetResponse();
    setLocalError(null);
  };

  const goToInvestmentDashboard = () => {
    clearTransaction();
    navigation.navigate(Screens.DASHBOARD as never);
  };

  return {
    executeTransaction,
    loading: isLoading,
    error: error || localError,
    response,
    reset,
    selectedETF,
    goToInvestmentDashboard,
  };
};
