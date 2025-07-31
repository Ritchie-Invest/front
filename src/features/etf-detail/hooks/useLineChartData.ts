import { useMemo } from 'react';
import { formatDate } from '~/utils/formatDate';
import { formatCurrency } from '~/utils/formatCurrency';
import { LineChartComponentPoint } from '../index';

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
            formattedValue: formatCurrency(Number(value)),
            formattedTime: formatDate(date, 'overlay'),
            originalData: item,
          },
        };
      });
  }, [priceHistory]);
}
