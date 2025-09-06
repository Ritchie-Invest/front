export interface LineChartProps {
  data: GenericChartPoint[];
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
  activePointColor?: string;
  backgroundColor?: string;
  showVerticalLine?: boolean;
  verticalLineColor?: string;
  endPointRadius?: number;
  animated?: boolean;
}
