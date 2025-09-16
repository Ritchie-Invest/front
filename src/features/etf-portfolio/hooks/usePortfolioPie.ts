import { useMemo } from 'react';
import { usePortfolio } from './usePortfolio';
import { PortfolioPieChartAdapter, PortfolioData } from '../adapters/PortfolioPieChartAdapter';
import { colors } from '~/lib/theme/theme';

export interface UsePortfolioPieOptions {
  cashColor?: string;
  investmentColor?: string;
}

export interface UsePortfolioPieReturn {
  portfolioData: PortfolioData[];
  adapter: PortfolioPieChartAdapter;
  formattedTotalValue: string;
  loading: boolean;
  totalValue: number;
  balance: number;
  investmentValue: number;
}

export const usePortfolioPie = (options: UsePortfolioPieOptions = {}): UsePortfolioPieReturn => {
  const { portfolio, loading } = usePortfolio();

  const { cashColor = colors.primaryActionColor, investmentColor = colors.warningColor } = options;

  const portfolioData = useMemo(() => {
    if (!portfolio) return [];

    return [
      {
        cash: portfolio.cash,
        investments: portfolio.investments,
      },
    ];
  }, [portfolio]);

  const adapter = useMemo(() => {
    return new PortfolioPieChartAdapter(cashColor, investmentColor);
  }, [cashColor, investmentColor]);

  const formattedTotalValue = useMemo(() => {
    return (portfolio?.totalValue ?? 0).toLocaleString('fr-FR', {
      style: 'currency',
      currency: portfolio?.currency ?? 'EUR',
    });
  }, [portfolio]);

  const totalValue = portfolio?.totalValue ?? 0;
  const balance = portfolio?.cash ?? 0;
  const investmentValue = portfolio?.investments ?? 0;

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
