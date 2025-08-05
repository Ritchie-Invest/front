import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TransactionType } from '../types/TransactionType';

export interface TransactionState {
  amount: string;
  shares: number;
  isLoading: boolean;
  message: string | null;
  messageType: boolean | null;
  setAmount: (amount: string) => void;
  setShares: (shares: number) => void;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string | null, type: boolean | null) => void;
  clearMessage: () => void;
  clearTransaction: () => void;
  clearInputsOnly: () => void;
}

type PersistedTransactionState = Pick<
  TransactionState,
  'amount' | 'shares' | 'message' | 'messageType'
>;

const zustandStorage = createJSONStorage<PersistedTransactionState>(() => AsyncStorage);

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      amount: '',
      shares: 0,
      isLoading: false,
      message: null,
      messageType: null,
      setAmount: (amount) => set({ amount }),
      setShares: (shares) => set({ shares }),
      setLoading: (loading) => set({ isLoading: loading }),
      setMessage: (message, type) => set({ message, messageType: type }),
      clearMessage: () => set({ message: null, messageType: null }),
      clearTransaction: () =>
        set({
          amount: '',
          shares: 0,
          isLoading: false,
          message: null,
          messageType: null,
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
        message: state.message,
        messageType: state.messageType,
      }),
    },
  ),
);
