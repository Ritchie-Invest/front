export const ETF_VALIDATION_RULES = {
  ETF_ID: {
    required: true,
    type: 'number',
    min: 1,
  },
  TICKER: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 10,
    pattern: /^[A-Z0-9]+$/,
  },
  NAME: {
    required: true,
    type: 'string',
    minLength: 1,
    maxLength: 200,
  },
  PRICE: {
    required: true,
    type: 'number',
    min: 0,
  },
  DATE_RANGE: {
    required: true,
    type: 'string',
    allowedValues: ['7D', '1M', '6M', '1Y'],
  },
} as const;

export const validateETFId = (etfId: unknown): etfId is number => {
  return typeof etfId === 'number' && etfId > 0;
};

export const validateDateRange = (dateRange: unknown): dateRange is string => {
  return (
    typeof dateRange === 'string' &&
    ETF_VALIDATION_RULES.DATE_RANGE.allowedValues.includes(dateRange as any)
  );
};

export const validatePriceData = (data: unknown): boolean => {
  if (!data || typeof data !== 'object') return false;

  const priceData = data as any;
  return (
    typeof priceData.open === 'number' &&
    typeof priceData.high === 'number' &&
    typeof priceData.low === 'number' &&
    typeof priceData.close === 'number' &&
    typeof priceData.volume === 'number' &&
    priceData.timestamp instanceof Date
  );
};
