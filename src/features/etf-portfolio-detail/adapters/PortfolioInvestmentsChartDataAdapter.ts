import { ChartDataAdapter, GenericChartPoint } from '~/components/molecules/models/LineChart';
import { PortfolioPosition } from '../models/PortfolioPosition';
import { formatDate } from '~/utils/formatDate';
import { formatCurrency } from '~/utils/formatCurrency';

export class PortfolioInvestmentsChartDataAdapter implements ChartDataAdapter<PortfolioPosition> {
  adaptData(portfolioPositions: PortfolioPosition[]): GenericChartPoint[] {
    return portfolioPositions
      .filter((item) => {
        const value = item.investments;
        const date = new Date(item.date);
        return !isNaN(value) && !isNaN(date.getTime()) && value !== null && value !== undefined;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((item) => {
        const value = item.investments;
        const date = new Date(item.date);
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
