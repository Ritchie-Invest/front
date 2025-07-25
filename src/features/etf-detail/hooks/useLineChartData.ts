import { useMemo } from 'react';

export interface LineChartPoint {
  y: number;
  x: number;
  extraData: {
    formattedValue: string;
    formattedTime: string;
    originalData: any;
  };
}

export function useLineChartData(priceHistory: any[]): LineChartPoint[] {
  return useMemo(() => {
    return priceHistory
      .filter((item) => {
        const value = item.close || item.value || item.price;
        const date = new Date(item.timestamp || item.date);
        return !isNaN(value) && !isNaN(date.getTime()) && value !== null && value !== undefined;
      })
      .map((item) => {
        const value = item.close || item.value || item.price;
        const date = new Date(item.timestamp || item.date);
        return {
          y: Number(value),
          x: date.getTime(),
          extraData: {
            formattedValue: formatPrice(Number(value)),
            formattedTime: formatDateForOverlay(date),
            originalData: item,
          },
        };
      });
  }, [priceHistory]);
}
import { formatPrice, formatDateForOverlay } from '../index';

export interface LineChartPoint {
  y: number;
  x: number;
  extraData: {
    formattedValue: string;
    formattedTime: string;
    originalData: any;
  };
}
