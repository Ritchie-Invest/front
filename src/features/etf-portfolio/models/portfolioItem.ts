import { PortfolioItemType } from '../types/portfolioItemType';

export interface PortfolioItemConfig {
  label: string;
  color: string;
  fontSize: 'lg' | '3xl';
  fontWeight: 'normal' | 'semibold' | 'bold';
}

export interface UsePortfolioItemProps {
  type: PortfolioItemType;
  value?: number;
  label?: string;
}

export interface UsePortfolioItemReturn {
  displayValue: number;
  displayLabel: string;
  config: PortfolioItemConfig;
  loading: boolean;
}
