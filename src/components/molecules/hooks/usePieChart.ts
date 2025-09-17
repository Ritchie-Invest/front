import { useMemo } from 'react';
import { PieChartDataAdapter, GenericPieChartData } from '../models/PieChart';

export function usePieChartData<T>(
  data: T[],
  adapter: PieChartDataAdapter<T>,
): GenericPieChartData[] {
  return useMemo(() => {
    return adapter.adaptData(data);
  }, [data, adapter]);
}
