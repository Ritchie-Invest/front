export interface LineChartProps {
  data: GenericChartPoint[];
  data2?: GenericChartPoint[];
  config?: LineChartConfig;
  emptyStateText?: string;
}

export interface GenericChartPoint {
  y: number;
  x: number;
  extraData: {
    formattedValue: string;
    formattedTime: string;
    originalData: any;
  };
}

export interface ChartDataAdapter<T = any> {
  adaptData: (rawData: T[]) => GenericChartPoint[];
}

export interface LineChartConfig {
  height?: number;
  lineColor?: string;
  lineColor2?: string;
  activePointColor?: string;
  activePointColor2?: string;
  backgroundColor?: string;
  showVerticalLine?: boolean;
  verticalLineColor?: string;
  endPointRadius?: number;
  endPointRadius2?: number;
  showDataPoints?: boolean;
  showDataPoints2?: boolean;
  animated?: boolean;
  startFillColor?: string;
  endFillColor?: string;
  startFillColor2?: string;
  endFillColor2?: string;
  startOpacity?: number;
  endOpacity?: number;
  startOpacity2?: number;
  endOpacity2?: number;
}
