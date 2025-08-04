import { useMemo } from 'react';
import { formatPrice } from '../utils/chartHelpers';
import { formatDateForOverlay } from '../utils/chartHelpers';

export interface LineChartComponentPoint {
  y: number;
  x: number;
  extraData: {
    formattedValue: string;
    formattedTime: string;
    originalData: any;
  };
}

export function useLineChartComponentData(priceHistory: any[]): LineChartComponentPoint[] {
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
