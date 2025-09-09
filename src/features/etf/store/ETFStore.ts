import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface ETFSelectedData {
  id: string;
  ticker: string;
  name: string;
  currentPrice: number;
}

interface ETFStoreState {
  selectedETF: ETFSelectedData | null;
  setSelectedETF: (etf: ETFSelectedData) => void;
  clearSelectedETF: () => void;
}

export const useETFStore = create<ETFStoreState>()(
  subscribeWithSelector((set) => ({
    selectedETF: null,

    setSelectedETF: (etf: ETFSelectedData) => {
      set({ selectedETF: etf });
    },

    clearSelectedETF: () => {
      set({ selectedETF: null });
    },
  })),
);

export const useSelectedETF = () => useETFStore((state) => state.selectedETF);
export const useSetSelectedETF = () => useETFStore((state) => state.setSelectedETF);
export const useClearSelectedETF = () => useETFStore((state) => state.clearSelectedETF);
