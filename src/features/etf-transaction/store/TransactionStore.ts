import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TransactionType } from '../types/TransactionType';
import { PostTransactionApiResponse } from '~/features/etf/models/Transaction';

export interface TransactionState {
  amount: string;
  shares: number;
  isLoading: boolean;
  error: string | null;
  response: PostTransactionApiResponse | null;
  setAmount: (amount: string) => void;
  setShares: (shares: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setResponse: (response: PostTransactionApiResponse | null) => void;
  clearTransaction: () => void;
  clearInputsOnly: () => void;
  resetResponse: () => void;
}

type PersistedTransactionState = Pick<TransactionState, 'amount' | 'shares'>;

const zustandStorage = createJSONStorage<PersistedTransactionState>(() => AsyncStorage);

export const useTransactionStore = create<TransactionState>()(
  // @ts-ignore
  persist(
    (set) => ({
      amount: '',
      shares: 0,
      isLoading: false,
      error: null,
      response: null,
      setAmount: (amount: string) => set({ amount }),
      setShares: (shares: number) => set({ shares }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      setError: (error: string | null) => set({ error }),
      setResponse: (response: PostTransactionApiResponse | null) => set({ response }),
      clearTransaction: () =>
        set({
          amount: '',
          shares: 0,
          isLoading: false,
          error: null,
          response: null,
        }),
      clearInputsOnly: () =>
        set({
          amount: '',
          shares: 0,
          isLoading: false,
          error: null,
          response: null,
        }),
      resetResponse: () =>
        set({
          error: null,
          response: null,
        }),
    }),
    {
      name: 'transaction-storage',
      storage: zustandStorage,
      partialize: (state) => ({
        amount: state.amount,
        shares: state.shares,
      }),
    },
  ),
);
