import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TransactionType } from '../types/TransactionType';

export interface TransactionState {
  amount: string;
  shares: number;
  isLoading: boolean;
  setAmount: (amount: string) => void;
  setShares: (shares: number) => void;
  setLoading: (loading: boolean) => void;
  clearTransaction: () => void;
  clearInputsOnly: () => void;
}

type PersistedTransactionState = Pick<TransactionState, 'amount' | 'shares'>;

const zustandStorage = createJSONStorage<PersistedTransactionState>(() => AsyncStorage);

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      amount: '',
      shares: 0,
      isLoading: false,
      setAmount: (amount) => set({ amount }),
      setShares: (shares) => set({ shares }),
      setLoading: (loading) => set({ isLoading: loading }),
      clearTransaction: () =>
        set({
          amount: '',
          shares: 0,
          isLoading: false,
        }),
      clearInputsOnly: () =>
        set({
          amount: '',
          shares: 0,
          isLoading: false,
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
