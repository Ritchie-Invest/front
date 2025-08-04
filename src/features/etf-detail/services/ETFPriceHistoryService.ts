import { ETFWithPriceHistory, DateRangeType, DATE_RANGE_OPTIONS } from '../index';

export class ETFPriceHistoryService {
  static async getETFWithPriceHistory(
    etfId: string,
    dateRange: DateRangeType,
  ): Promise<ETFWithPriceHistory> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const priceHistory = this.generateMockPriceHistory(dateRange);

    return {
      etfID: etfId,
      ticker: 'IWDA',
      name: 'iShares Core MSCI World UCITS ETF',
      currentPrice: priceHistory[priceHistory.length - 1].close,
      priceHistory,
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

  private static generateDatePoints(endDate: Date, dateRange: DateRangeType): Date[] {
    const dates: Date[] = [];
    const end = new Date(endDate);

    switch (dateRange) {
      case '7D': {
        const sevenDaysCount =
          DATE_RANGE_OPTIONS.find((option) => option.value === '7D')?.days || 7;
        for (let i = sevenDaysCount - 1; i >= 0; i--) {
          const date = new Date(end);
          date.setDate(date.getDate() - i);
          dates.push(date);
        }
        break;
      }
      case '1M': {
        const oneMonthDays = DATE_RANGE_OPTIONS.find((option) => option.value === '1M')?.days || 30;
        for (let i = oneMonthDays; i >= 0; i -= 3) {
          const date = new Date(end);
          date.setDate(date.getDate() - i);
          dates.push(date);
        }
        break;
      }
      case '6M': {
        const sixMonthsCount = Math.floor(
          (DATE_RANGE_OPTIONS.find((option) => option.value === '6M')?.days || 180) / 30,
        );
        for (let monthOffset = sixMonthsCount - 1; monthOffset >= 0; monthOffset--) {
          const firstDate = new Date(end.getFullYear(), end.getMonth() - monthOffset, 1);
          if (firstDate <= end) dates.push(firstDate);

          const midDate = new Date(end.getFullYear(), end.getMonth() - monthOffset, 15);
          if (midDate <= end) dates.push(midDate);
        }
        break;
      }
      case '1Y': {
        const oneYearMonths = Math.floor(
          (DATE_RANGE_OPTIONS.find((option) => option.value === '1Y')?.days || 365) / 30,
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
