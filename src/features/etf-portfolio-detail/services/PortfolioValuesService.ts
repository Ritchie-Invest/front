import { Portfolio } from '../../etf-portfolio/models/portfolio';
import { DateRangeType, DATE_RANGE_OPTIONS } from '~/components/molecules/types/dateRange';

export class PortfolioValuesService {
  static async getPortfolioValuesByDateRange(
    portfolioId: number,
    dateRange: DateRangeType,
  ): Promise<Portfolio[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const portfolioHistory = this.generateMockPortfolioHistory(portfolioId, dateRange);
    return portfolioHistory;
  }

  static async getPortfolioValues(portfolioId?: number): Promise<Portfolio[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return this.generateMockPortfolioHistory(portfolioId || 1, DateRangeType.OneYear);
  }

  static async getLatestPortfolioValue(portfolioId?: number): Promise<Portfolio | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const portfolioHistory = this.generateMockPortfolioHistory(
      portfolioId || 1,
      DateRangeType.SevenDays,
    );
    return portfolioHistory[portfolioHistory.length - 1] || null;
  }

  private static generateMockPortfolioHistory(
    portfolioId: number,
    dateRange: DateRangeType,
  ): Portfolio[] {
    const now = new Date();
    const portfolioHistory: Portfolio[] = [];
    let currentBalance = 10000;
    let currentValue = 25000;

    const dates = this.generateDatePoints(now, dateRange);

    for (const date of dates) {
      const balanceVariation = (Math.random() - 0.3) * 0.02;
      const valueVariation = (Math.random() - 0.5) * 0.03;

      currentBalance = Math.max(0, currentBalance * (1 + balanceVariation));
      currentValue = Math.max(currentBalance, currentValue * (1 + valueVariation));

      portfolioHistory.push({
        portfolioId,
        balance: Math.round(currentBalance * 100) / 100,
        currentValue: Math.round(currentValue * 100) / 100,
        timestamp: new Date(date),
      });
    }

    return portfolioHistory;
  }

  static generatePoints(endDate: Date, totalDays?: number, step?: number): Date[] {
    const finalTotalDays = totalDays || 30;
    const finalStep = step || 3;
    const dates: Date[] = [];
    for (let i = finalTotalDays; i >= 0; i -= finalStep) {
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

export const portfolioValuesService = {
  getPortfolioValues: async (): Promise<Portfolio[]> => {
    return PortfolioValuesService.getPortfolioValues();
  },

  getPortfolioValuesByDateRange: async (startDate: Date, endDate: Date): Promise<Portfolio[]> => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let dateRange: DateRangeType;
    if (diffDays <= 7) {
      dateRange = DateRangeType.SevenDays;
    } else if (diffDays <= 30) {
      dateRange = DateRangeType.OneMonth;
    } else if (diffDays <= 180) {
      dateRange = DateRangeType.SixMonths;
    } else {
      dateRange = DateRangeType.OneYear;
    }

    const portfolioHistory = await PortfolioValuesService.getPortfolioValuesByDateRange(
      1,
      dateRange,
    );
    return portfolioHistory.filter(
      (portfolio) => portfolio.timestamp >= startDate && portfolio.timestamp <= endDate,
    );
  },

  getLatestPortfolioValue: async (): Promise<Portfolio | null> => {
    return PortfolioValuesService.getLatestPortfolioValue();
  },
};
