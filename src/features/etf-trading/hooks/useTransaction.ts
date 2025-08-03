import { useState, useEffect } from 'react';
import {
  TradingFormState,
  TradingActionConfig,
  TradingFormData,
  TradingFormValidation,
  TRADING_ACTION_CONFIG,
} from '../models/FormConfig';
import { TransactionType } from '../types/Transaction';
import { TransactionRequest } from '../models/Request';
import { ETFWithPriceHistory } from '../../etf-detail/model/etfPriceData';

interface UseTradingFormProps {
  etfData: ETFWithPriceHistory;
  action: TransactionType;
  userCash: number;
  userPosition?: { shares: number; avgBuyPrice: number } | null;
  onCalculateFees: (amount: number) => Promise<number>;
}

export const useTradingForm = ({
  etfData,
  action,
  userCash,
  userPosition,
  onCalculateFees,
}: UseTradingFormProps) => {
  const [formState, setFormState] = useState<TradingFormState>({
    amount: '',
    shares: '',
    inputMode: 'amount',
    estimatedFees: 0,
    isCalculatingFees: false,
    validationError: null,
  });

  const actionConfig = TRADING_ACTION_CONFIG[action];
  const isBuying = action === TransactionType.Buy;

  useEffect(() => {
    const calculateFees = async () => {
      if (!formState.amount || parseFloat(formState.amount) <= 0) {
        setFormState((prev) => ({ ...prev, estimatedFees: 0 }));
        return;
      }

      setFormState((prev) => ({ ...prev, isCalculatingFees: true }));
      try {
        const fees = await onCalculateFees(parseFloat(formState.amount));
        setFormState((prev) => ({
          ...prev,
          estimatedFees: fees,
          isCalculatingFees: false,
        }));
      } catch (error) {
        console.error('Erreur calcul frais:', error);
        setFormState((prev) => ({
          ...prev,
          estimatedFees: 0,
          isCalculatingFees: false,
        }));
      }
    };

    const debounceTimer = setTimeout(calculateFees, 500);
    return () => clearTimeout(debounceTimer);
  }, [formState.amount, onCalculateFees]);

  useEffect(() => {
    if (formState.inputMode === 'amount' && formState.amount) {
      const amountValue = parseFloat(formState.amount);
      if (amountValue > 0) {
        const calculatedShares = (amountValue / etfData.currentPrice).toFixed(6);
        setFormState((prev) => ({ ...prev, shares: calculatedShares }));
      }
    }
  }, [formState.amount, etfData.currentPrice, formState.inputMode]);

  useEffect(() => {
    if (formState.inputMode === 'shares' && formState.shares) {
      const sharesValue = parseFloat(formState.shares);
      if (sharesValue > 0) {
        const calculatedAmount = (sharesValue * etfData.currentPrice).toFixed(2);
        setFormState((prev) => ({ ...prev, amount: calculatedAmount }));
      }
    }
  }, [formState.shares, etfData.currentPrice, formState.inputMode]);

  const validateForm = (): TradingFormValidation => {
    const amountValue = parseFloat(formState.amount);
    const sharesValue = parseFloat(formState.shares);

    if (!amountValue || amountValue <= 0) {
      return { isValid: false, errorMessage: 'Veuillez saisir un montant valide' };
    }

    if (!sharesValue || sharesValue <= 0) {
      return { isValid: false, errorMessage: 'Le nombre de parts doit être positif' };
    }

    if (isBuying && amountValue + formState.estimatedFees > userCash) {
      return {
        isValid: false,
        errorMessage: `Fonds insuffisants. Disponible: ${userCash.toFixed(2)}€`,
      };
    }

    if (!isBuying && userPosition && sharesValue > userPosition.shares) {
      return {
        isValid: false,
        errorMessage: `Parts insuffisantes. Disponible: ${userPosition.shares} parts`,
      };
    }

    return { isValid: true };
  };

  const updateAmount = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      amount: value,
      inputMode: 'amount',
      validationError: null,
    }));
  };

  const updateShares = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      shares: value,
      inputMode: 'shares',
      validationError: null,
    }));
  };

  const setInputMode = (mode: 'amount' | 'shares') => {
    setFormState((prev) => ({ ...prev, inputMode: mode }));
  };

  const createTradingOrder = (): TransactionRequest => {
    return {
      quantity: parseFloat(formState.shares),
      etfId: etfData.etfID,
      userId: '', // À remplir avec l'ID utilisateur réel
      type: action,
      price: etfData.currentPrice,
      estimatedFees: formState.estimatedFees,
    };
  };

  const getTotalAmount = (): number => {
    return isBuying
      ? parseFloat(formState.amount || '0') + formState.estimatedFees
      : parseFloat(formState.amount || '0') - formState.estimatedFees;
  };

  const setValidationError = (error: string | null) => {
    setFormState((prev) => ({ ...prev, validationError: error }));
  };

  const resetForm = () => {
    setFormState({
      amount: '',
      shares: '',
      inputMode: 'amount',
      estimatedFees: 0,
      isCalculatingFees: false,
      validationError: null,
    });
  };

  return {
    formState,
    actionConfig,
    isBuying,
    totalAmount: getTotalAmount(),
    updateAmount,
    updateShares,
    setInputMode,
    validateForm,
    createTradingOrder,
    setValidationError,
    resetForm,
  };
};
