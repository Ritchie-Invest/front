import { ChartDataAdapter, GenericChartPoint } from '~/components/molecules/models/LineChart';
import { Portfolio } from '../../etf-portfolio/models/portfolio';
import { formatDate } from '~/utils/formatDate';
import { formatCurrency } from '~/utils/formatCurrency';

export class PortfolioChartDataAdapter implements ChartDataAdapter<Portfolio> {
  adaptData(portfolioValues: Portfolio[]): GenericChartPoint[] {
    return portfolioValues
      .filter((item) => {
        const value = item.currentValue;
        const date = new Date(item.timestamp);
        return !isNaN(value) && !isNaN(date.getTime()) && value !== null && value !== undefined;
      })
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map((item) => {
        const value = item.currentValue;
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
