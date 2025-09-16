import { useMemo } from 'react';
import { ChartDataAdapter } from '../models/LineChart';
import { GenericChartPoint } from '../models/LineChart';

export function useChartData<T>(data: T[], adapter: ChartDataAdapter<T>): GenericChartPoint[] {
  return useMemo(() => {
    return adapter.adaptData(data);
  }, [data, adapter]);
}

export function useChartDataDual<T>(
  data: T[],
  adapter: ChartDataAdapter<T>,
  data2?: T[],
  adapter2?: ChartDataAdapter<T>,
): { data1: GenericChartPoint[]; data2?: GenericChartPoint[] } {
  const data1 = useMemo(() => {
    return adapter.adaptData(data);
  }, [data, adapter]);

  const processedData2 = useMemo(() => {
    if (!data2 || !adapter2) return undefined;
    return adapter2.adaptData(data2);
  }, [data2, adapter2]);

  return {
    data1,
    data2: processedData2,
  };
}
