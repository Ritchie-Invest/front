import { ETFPriceData } from '../model/etfPriceData';

export interface ChartDataPoint {
  value: number;
  label: string;
  date: string;
  timestamp: Date;
}

export const formatDateForOverlay = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const calculatePriceChange = (
  priceHistory: ETFPriceData[],
): { amount: number; percentage: number } => {
  if (priceHistory.length < 2) {
    return { amount: 0, percentage: 0 };
  }

  const firstPrice = priceHistory[0].close;
  const lastPrice = priceHistory[priceHistory.length - 1].close;
  const amount = lastPrice - firstPrice;
  const percentage = (amount / firstPrice) * 100;

  return { amount, percentage };
};
