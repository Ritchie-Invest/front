export interface TimeRangeOption<T = string> {
  label: string;
  value: T;
  days?: number;
}

export interface TimeRangeSelectorConfig {
  activeColor?: string;
  inactiveColor?: string;
  activeTextColor?: string;
  inactiveTextColor?: string;
  spacing?: number;
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  marginBottom?: number;
}
