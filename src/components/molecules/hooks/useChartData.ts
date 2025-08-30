import { useMemo } from 'react';
import { ChartDataAdapter } from '../models/LineChart';
import { GenericChartPoint } from '../models/LineChart';

export function useChartData<T>(data: T[], adapter: ChartDataAdapter<T>): GenericChartPoint[] {
  return useMemo(() => {
    return adapter.adaptData(data);
  }, [data, adapter]);
}
