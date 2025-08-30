export type DateRangeType = '7D' | '1M' | '6M' | '1Y';

export interface DateRangeOption {
  label: string;
  value: DateRangeType;
  days: number;
}

export const DATE_RANGE_OPTIONS: DateRangeOption[] = [
  { label: '7J', value: '7D', days: 7 },
  { label: '1M', value: '1M', days: 30 },
  { label: '6M', value: '6M', days: 180 },
  { label: '1A', value: '1Y', days: 365 },
];
