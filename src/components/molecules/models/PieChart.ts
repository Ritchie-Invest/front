export interface PieChartProps {
  data: GenericPieChartData[];
  config?: PieChartConfig;
  emptyStateText?: string;
  onPress?: () => void;
}

export interface GenericPieChartData {
  value: number;
  color?: string;
  label: string;
  formattedValue?: string;
  extraData?: any;
}

export interface PieChartDataAdapter<T = any> {
  adaptData: (rawData: T[]) => GenericPieChartData[];
}

export interface PieChartConfig {
  size?: number;
  strokeWidth?: number;
  showLabels?: boolean;
  showPercentage?: boolean;
  backgroundColor?: string;
  animated?: boolean;
  labelTextColor?: string;
  labelFontSize?: number;
  centerLabelComponent?: React.ReactNode;
  innerRadius?: number;
  showGradient?: boolean;
  sectionAutoFocus?: boolean;
  innerCircleColor?: string;
  defaultColors?: string[];
}
