import { ChartDataAdapter, GenericChartPoint } from '~/components/molecules/models/LineChart';
import { ETFPriceData } from '~/features/etf/models/ETFPriceData';
import { formatDate } from '~/utils/formatDate';
import { formatCurrency } from '~/utils/formatCurrency';

export class ETFChartDataAdapter implements ChartDataAdapter<ETFPriceData> {
  adaptData(priceHistory: ETFPriceData[]): GenericChartPoint[] {
    return priceHistory
      .filter((item) => {
        const value = item.close;
        const date = new Date(item.timestamp);
        return !isNaN(value) && !isNaN(date.getTime()) && value !== null && value !== undefined;
      })
      .map((item) => {
        const value = item.close;
        const date = new Date(item.timestamp);
        return {
          y: Number(value),
          x: date.getTime(),
          extraData: {
            formattedValue: formatCurrency(Number(value)),
            formattedTime: formatDate(date, 'overlay'),
            originalData: item,
          },
        };
      });
  }
}
