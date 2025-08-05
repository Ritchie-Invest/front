import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ETFWithCurrentPrice } from '../models/ETFWithCurrentPrice';

export interface ETFState {
  selectedETF: ETFWithCurrentPrice | null;
  setSelectedETF: (etf: ETFWithCurrentPrice) => void;
  clearSelectedETF: () => void;
}

const zustandStorage = createJSONStorage<ETFState>(() => AsyncStorage);

export const useETFStore = create<ETFState>()(
  persist(
    (set) => ({
      selectedETF: null,
      setSelectedETF: (etf) => set({ selectedETF: etf }),
      clearSelectedETF: () => set({ selectedETF: null }),
    }),
    {
      name: 'etf-storage',
      storage: zustandStorage,
    },
  ),
);
