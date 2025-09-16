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
      const formattedCash = data.cash.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      });
      result.push({
        value: data.cash,
        label: `Liquidités: ${formattedCash}`,
        color: this.cashColor,
        formattedValue: formattedCash,
        extraData: {
          type: 'cash',
          originalData: data,
        },
      });
    }

    if (data.investments > 0) {
      const formattedInvestments = data.investments.toLocaleString('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      });
      result.push({
        value: data.investments,
        label: `Investissements: ${formattedInvestments}`,
        color: this.investmentColor,
        formattedValue: formattedInvestments,
        extraData: {
          type: 'investments',
          originalData: data,
        },
      });
    }

    return result;
  }
}
