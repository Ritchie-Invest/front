export enum DateRangeType {
  SevenDays = '7D',
  OneMonth = '1M',
  SixMonths = '6M',
  OneYear = '1Y',
}

export interface DateRangeOption {
  label: string;
  value: DateRangeType;
  days: number;
}

export const DATE_RANGE_OPTIONS: DateRangeOption[] = [
  { label: '7J', value: DateRangeType.SevenDays, days: 7 },
  { label: '1M', value: DateRangeType.OneMonth, days: 30 },
  { label: '6M', value: DateRangeType.SixMonths, days: 180 },
  { label: '1A', value: DateRangeType.OneYear, days: 365 },
];
