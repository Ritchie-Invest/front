import { useMemo } from 'react';
import { ChartDataAdapter, GenericChartPoint, LineChartConfig } from '../models/LineChart';
import { Dimensions } from 'react-native';
import { borderRadius, colors, paddings, typography } from '~/lib/theme/theme';

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

const defaultConfig: LineChartConfig = {
  height: 240,
  lineColor: colors.primaryActionColor,
  lineColor2: colors.warningColor,
  activePointColor: colors.primaryActionColor,
  activePointColor2: colors.warningColor,
  backgroundColor: colors.transparent,
  showVerticalLine: true,
  verticalLineColor: colors.GreyL20,
  endPointRadius: 4,
  endPointRadius2: 4,
  showDataPoints: true,
  showDataPoints2: true,
  animated: true,
  startFillColor: colors.primaryActionColor,
  endFillColor: colors.transparent,
  startFillColor2: colors.warningColor,
  endFillColor2: colors.transparent,
  startOpacity: 0.8,
  endOpacity: 0.1,
  startOpacity2: 0.8,
  endOpacity2: 0.1,
};

export function useLineChart(
  data: GenericChartPoint[],
  data2?: GenericChartPoint[] | undefined,
  config: Partial<LineChartConfig> = {},
) {
  const chartConfig = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  const screenWidth = Dimensions.get('screen').width;
  const chartWidth = screenWidth * 0.8;
  const chartHeight = chartWidth * 0.8;

  const yAxisOffset = useMemo(() => {
    if (!data || data.length === 0) return 0;
    let maxValue = Math.max(...data.map((point) => point.y));
    let minValue = Math.min(...data.map((point) => point.y));

    if (data2 && data2.length > 0) {
      const maxValue2 = Math.max(...data2.map((point) => point.y));
      maxValue = Math.max(maxValue, maxValue2);
      const minValue2 = Math.min(...data2.map((point) => point.y));
      minValue = Math.min(minValue, minValue2);
    }

    const difference = maxValue - minValue;

    if (difference <= 5 && minValue > 5) {
      return minValue - 5;
    } else if (difference <= 5 && minValue <= 5) {
      return 0;
    } else if (difference > 5 && minValue > 10) {
      return minValue - 10;
    } else {
      return 0;
    }
  }, [data, data2]);

  const chartData = useMemo(() => {
    return data.map((point) => ({
      value: point.y,
      dataPointText: point.extraData?.formattedValue || point.y.toString(),
      label: point.extraData?.formattedTime,
      dataPointColor: chartConfig.activePointColor,
      dataPointRadius: chartConfig.endPointRadius,
      hideDataPoint: !chartConfig.showDataPoints,
    }));
  }, [data, chartConfig.activePointColor, chartConfig.endPointRadius, chartConfig.showDataPoints]);

  const chartData2 = useMemo(() => {
    if (!data2 || data2.length === 0) return null;
    return data2.map((point) => ({
      value: point.y,
      dataPointText: point.extraData?.formattedValue || point.y.toString(),
      label: point.extraData?.formattedTime,
      dataPointColor: chartConfig.activePointColor2,
      dataPointRadius: chartConfig.endPointRadius2,
      hideDataPoint: !chartConfig.showDataPoints2,
    }));
  }, [
    data2,
    chartConfig.activePointColor2,
    chartConfig.endPointRadius2,
    chartConfig.showDataPoints2,
  ]);

  return {
    chartConfig,
    chartWidth,
    chartHeight,
    yAxisOffset,
    chartData,
    chartData2,
  };
}
