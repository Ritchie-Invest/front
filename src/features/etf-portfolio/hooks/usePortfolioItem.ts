import { usePortfolio } from './usePortfolio';
import { PortfolioItemType } from '../types/portfolioItemType';
import {
  PortfolioItemConfig,
  UsePortfolioItemProps,
  UsePortfolioItemReturn,
} from '../models/portfolioBalance';

const getItemConfig = (type: PortfolioItemType): PortfolioItemConfig => {
  switch (type) {
    case PortfolioItemType.TotalValue:
      return {
        label: 'Valeur totale du portfolio',
        color: 'blue.600',
        fontSize: '$3xl' as const,
        fontWeight: 'bold' as const,
      };
    case PortfolioItemType.Liquidity:
      return {
        label: 'Liquidités',
        color: 'green.600',
        fontSize: '$lg' as const,
        fontWeight: 'semibold' as const,
      };
    case PortfolioItemType.Investment:
      return {
        label: 'Investissements',
        color: 'blue.600',
        fontSize: '$lg' as const,
        fontWeight: 'semibold' as const,
      };
    default:
      return {
        label: '',
        color: 'gray.600',
        fontSize: '$lg' as const,
        fontWeight: 'normal' as const,
      };
  }
};

export const usePortfolioItem = ({
  type,
  value: providedValue,
  label: providedLabel,
}: UsePortfolioItemProps): UsePortfolioItemReturn => {
  const { portfolio, totalValue, loading } = usePortfolio();
  const config = getItemConfig(type);

  const getValue = (): number => {
    if (providedValue !== undefined) {
      return providedValue;
    }

    if (loading || !portfolio) {
      return 0;
    }

    switch (type) {
      case PortfolioItemType.TotalValue:
        return totalValue;
      case PortfolioItemType.Liquidity:
        return portfolio.balance;
      case PortfolioItemType.Investment:
        return totalValue - portfolio.balance;
      default:
        return 0;
    }
  };

  const displayValue = getValue();
  const displayLabel = providedLabel || config.label;

  return {
    displayValue,
    displayLabel,
    config,
    loading: loading && providedValue === undefined,
  };
};
