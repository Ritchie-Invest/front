import { ETFWithPriceHistory } from '../models/ETFPriceHistory';

import { DateRangeType } from '~/components/molecules/types/dateRange';
import { DATE_RANGE_OPTIONS } from '~/components/molecules/types/dateRange';

export class ETFPriceHistoryService {
  static async getETFWithPriceHistory(
    id: string,
    dateRange: DateRangeType,
  ): Promise<ETFWithPriceHistory> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const priceHistory = this.generateMockPriceHistory(dateRange);

    const firstPrice = priceHistory[0]?.close ?? 0;
    const lastPrice = priceHistory[priceHistory.length - 1]?.close ?? 0;
    const priceChangePercentage =
      firstPrice !== 0 ? ((lastPrice - firstPrice) / firstPrice) * 100 : 0;
    const isGaining = lastPrice >= firstPrice;

    return {
      id: id,
      ticker: 'IWDA',
      name: 'iShares Core MSCI World UCITS ETF',
      currentPrice: lastPrice,
      priceHistory,
      priceChangePercentage,
      isGaining,
    };
  }

  private static generateMockPriceHistory(dateRange: DateRangeType) {
    const now = new Date();
    const priceHistory = [];
    let currentPrice = 85.45;

    const dates = this.generateDatePoints(now, dateRange);

    for (const date of dates) {
      const variation = (Math.random() - 0.5) * 0.05;
      currentPrice = currentPrice * (1 + variation);

      const dayVariation = currentPrice * 0.02;
      const open = currentPrice + (Math.random() - 0.5) * dayVariation;
      const close = currentPrice;
      const high = Math.max(open, close) + Math.random() * dayVariation * 0.5;
      const low = Math.min(open, close) - Math.random() * dayVariation * 0.5;
      const volume = Math.floor(Math.random() * 50000) + 10000;

      priceHistory.push({
        timestamp: date,
        open: Math.round(open * 100) / 100,
        high: Math.round(high * 100) / 100,
        low: Math.round(low * 100) / 100,
        close: Math.round(close * 100) / 100,
        volume,
      });
    }

    return priceHistory;
  }

  static generatePoints(endDate: Date, oneMonthDays: number = 30, step: number = 3): Date[] {
    const dates: Date[] = [];
    for (let i = oneMonthDays; i >= 0; i -= step) {
      const date = new Date(endDate);
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    return dates;
  }

  private static generateDatePoints(endDate: Date, dateRange: DateRangeType): Date[] {
    const dates: Date[] = [];
    const end = new Date(endDate);

    switch (dateRange) {
      case DateRangeType.SevenDays: {
        const sevenDaysCount =
          DATE_RANGE_OPTIONS.find((option) => option.value === DateRangeType.SevenDays)?.days ?? 7;
        return this.generatePoints(end, sevenDaysCount, 1);
      }
      case DateRangeType.OneMonth: {
        const oneMonthDays =
          DATE_RANGE_OPTIONS.find((option) => option.value === DateRangeType.OneMonth)?.days ?? 30;
        return this.generatePoints(end, oneMonthDays, 1);
      }
      case DateRangeType.SixMonths: {
        const sixMonthsCount = Math.floor(
          (DATE_RANGE_OPTIONS.find((option) => option.value === DateRangeType.SixMonths)?.days ||
            180) / 30,
        );
        for (let monthOffset = sixMonthsCount - 1; monthOffset >= 0; monthOffset--) {
          const firstDate = new Date(end.getFullYear(), end.getMonth() - monthOffset, 1);
          if (firstDate <= end) dates.push(firstDate);

          const midDate = new Date(end.getFullYear(), end.getMonth() - monthOffset, 15);
          if (midDate <= end) dates.push(midDate);
        }
        break;
      }
      case DateRangeType.OneYear: {
        const oneYearMonths = Math.floor(
          (DATE_RANGE_OPTIONS.find((option) => option.value === DateRangeType.OneYear)?.days ||
            365) / 30,
        );
        for (let monthOffset = oneYearMonths - 1; monthOffset >= 0; monthOffset--) {
          const firstDate = new Date(end.getFullYear(), end.getMonth() - monthOffset, 1);
          if (firstDate <= end) dates.push(firstDate);
        }
        break;
      }
    }

    return dates.sort((a, b) => a.getTime() - b.getTime());
  }
}
