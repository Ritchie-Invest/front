import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { ETFPriceHistoryServiceAdapter } from '../adapters/ETFPriceHistoryServiceAdapter';
import { ETFDetailState } from '../models/ETFDetail';
import { DateRangeType } from '~/components/molecules/types/dateRange';

const etfDetailService = new ETFPriceHistoryServiceAdapter();

export const useETFDetailStore = create<ETFDetailState>()(
  subscribeWithSelector((set, get) => ({
    etfId: null,
    selectedRange: DateRangeType.OneMonth,
    etfData: null,
    staticData: null,
    loading: false,
    error: null,

    setETFId: (etfId) => {
      set({ etfId });
      get().fetchETFData();
    },

    setSelectedRange: (selectedRange) => {
      set({ selectedRange });
      get().fetchETFData();
    },

    fetchETFData: async () => {
      const { etfId, selectedRange, staticData } = get();

      if (!etfId) return;

      try {
        set({ loading: true, error: null });
        const etfData = await etfDetailService.getETFWithPriceHistory(etfId, selectedRange);

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
        etfId: null,
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
