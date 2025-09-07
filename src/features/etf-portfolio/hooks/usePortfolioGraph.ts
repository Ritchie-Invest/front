import { useMemo } from 'react';
import { usePortfolio } from './usePortfolio';
import { PortfolioPieChartAdapter, PortfolioData } from '../adapters/PortfolioPieChartAdapter';
import { colors } from '~/lib/theme/theme';

export interface UsePortfolioGraphOptions {
  cashColor?: string;
  investmentColor?: string;
}

export interface UsePortfolioGraphReturn {
  portfolioData: PortfolioData[];
  adapter: PortfolioPieChartAdapter;
  formattedTotalValue: string;
  loading: boolean;
  totalValue: number;
  balance: number;
  investmentValue: number;
}

export const usePortfolioGraph = (
  options: UsePortfolioGraphOptions = {},
): UsePortfolioGraphReturn => {
  const { portfolio, totalValue, loading } = usePortfolio();

  const { cashColor = colors.primaryActionColor, investmentColor = colors.warningColor } = options;

  const portfolioData = useMemo(() => {
    if (!portfolio) return [];

    const balance = portfolio.balance ?? 0;
    const investmentValue = totalValue - balance;

    return [
      {
        cash: balance,
        investments: investmentValue,
      },
    ];
  }, [portfolio, totalValue]);

  const adapter = useMemo(() => {
    return new PortfolioPieChartAdapter(cashColor, investmentColor);
  }, [cashColor, investmentColor]);

  const formattedTotalValue = useMemo(() => {
    return totalValue.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
  }, [totalValue]);

  const balance = portfolio?.balance ?? 0;
  const investmentValue = totalValue - balance;

  return {
    portfolioData,
    adapter,
    formattedTotalValue,
    loading,
    totalValue,
    balance,
    investmentValue,
  };
};
