import { PieChartDataAdapter, GenericPieChartData } from '~/components/molecules/models/PieChart';
import { colors } from '~/lib/theme/theme';

export interface PortfolioData {
  cash: number;
  investments: number;
}

export class PortfolioPieChartAdapter implements PieChartDataAdapter<PortfolioData> {
  private cashColor: string;
  private investmentColor: string;

  constructor(
    cashColor: string = colors.successColor,
    investmentColor: string = colors.primaryActionColor,
  ) {
    this.cashColor = cashColor;
    this.investmentColor = investmentColor;
  }

  adaptData(rawData: PortfolioData[]): GenericPieChartData[] {
    if (!rawData || rawData.length === 0) return [];

    const data = rawData[0];
    const result: GenericPieChartData[] = [];

    if (data.cash > 0) {
      result.push({
        value: data.cash,
        label: 'Liquidités',
        color: this.cashColor,
        formattedValue: `${data.cash.toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        })}`,
        extraData: {
          type: 'cash',
          originalData: data,
        },
      });
    }

    if (data.investments > 0) {
      result.push({
        value: data.investments,
        label: 'Investissements',
        color: this.investmentColor,
        formattedValue: `${data.investments.toLocaleString('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        })}`,
        extraData: {
          type: 'investments',
          originalData: data,
        },
      });
    }

    return result;
  }
}
