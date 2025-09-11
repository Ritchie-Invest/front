import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { DateRangeType } from '~/components/molecules/types/dateRange';

export interface ETFSelectedData {
  id: string;
  ticker: string;
  name: string;
  currentPrice: number;
  userShares?: number;
  userAmount?: number;
}

interface ETFStoreState {
  selectedETF: ETFSelectedData | null;
  selectedRange: DateRangeType;
  setSelectedETF: (etf: ETFSelectedData) => void;
  clearSelectedETF: () => void;
  setSelectedRange: (range: DateRangeType) => void;
}

export const useETFStore = create<ETFStoreState>()(
  subscribeWithSelector((set) => ({
    selectedETF: null,
    selectedRange: DateRangeType.SevenDays,

    setSelectedETF: (etf: ETFSelectedData) => {
      set({ selectedETF: etf });
    },

    clearSelectedETF: () => {
      set({ selectedETF: null });
    },

    setSelectedRange: (range: DateRangeType) => {
      set({ selectedRange: range });
    },
  })),
);

export const useSelectedETF = () => useETFStore((state) => state.selectedETF);
export const useSetSelectedETF = () => useETFStore((state) => state.setSelectedETF);
export const useClearSelectedETF = () => useETFStore((state) => state.clearSelectedETF);
export const useSelectedRange = () => useETFStore((state) => state.selectedRange);
export const useSetSelectedRange = () => useETFStore((state) => state.setSelectedRange);
