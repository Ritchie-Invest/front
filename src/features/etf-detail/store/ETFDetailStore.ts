import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { ETFPriceHistoryServiceAdapter } from '../adapters/ETFPriceHistoryServiceAdapter';
import { ETFDetailState } from '../models/ETFDetail';
import { DateRangeType } from '~/components/molecules/types/dateRange';

const etfPriceHistoryService = new ETFPriceHistoryServiceAdapter();

export const useETFDetailStore = create<ETFDetailState>()(
  subscribeWithSelector((set, get) => ({
    id: null,
    selectedRange: DateRangeType.OneMonth,
    etfData: null,
    staticData: null,
    loading: false,
    error: null,

    setETFId: (id) => {
      set({ id });
      get().fetchETFData();
    },

    setSelectedRange: (selectedRange) => {
      set({ selectedRange });
      get().fetchETFData();
    },

    fetchETFData: async () => {
      const { id, selectedRange, staticData } = get();

      if (!id) return;

      try {
        set({ loading: true, error: null });
        const etfData = await etfPriceHistoryService.getETFWithPriceHistory(id, selectedRange);

        const newStaticData = {
          ticker: etfData.ticker,
          name: etfData.name,
          currentPrice: etfData.currentPrice,
        };

        const shouldUpdateStatic = !staticData || staticData.ticker !== newStaticData.ticker;

        set({
          etfData,
          loading: false,
          ...(shouldUpdateStatic && { staticData: newStaticData }),
        });
      } catch (error) {
        set({
          loading: false,
          error: error instanceof Error ? error.message : 'Une erreur est survenue',
          etfData: null,
        });
      }
    },

    reset: () =>
      set({
        id: null,
        selectedRange: DateRangeType.OneMonth,
        etfData: null,
        staticData: null,
        loading: false,
        error: null,
      }),
  })),
);

export const useETFStaticData = () => useETFDetailStore((state) => state.staticData);
export const useETFData = () => useETFDetailStore((state) => state.etfData);
export const useETFSelectedRange = () => useETFDetailStore((state) => state.selectedRange);
export const useETFLoading = () => useETFDetailStore((state) => state.loading);
export const useETFError = () => useETFDetailStore((state) => state.error);
