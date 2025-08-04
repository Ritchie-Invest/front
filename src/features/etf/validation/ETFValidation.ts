export const ETF_VALIDATION_RULES = {
  ETF_ID: {
    required: true,
    type: 'string',
    minLength: 1,
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

export const validateETFId = (etfId: unknown): etfId is string => {
  return typeof etfId === 'string' && etfId.length > 0;
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

export const validateETF = (etf: unknown): boolean => {
  if (!etf || typeof etf !== 'object') return false;

  const etfData = etf as any;
  return (
    validateETFId(etfData.etfID) &&
    typeof etfData.ticker === 'string' &&
    etfData.ticker.length >= ETF_VALIDATION_RULES.TICKER.minLength &&
    etfData.ticker.length <= ETF_VALIDATION_RULES.TICKER.maxLength &&
    ETF_VALIDATION_RULES.TICKER.pattern.test(etfData.ticker) &&
    typeof etfData.name === 'string' &&
    etfData.name.length >= ETF_VALIDATION_RULES.NAME.minLength &&
    etfData.name.length <= ETF_VALIDATION_RULES.NAME.maxLength
  );
};

export const validateETFWithCurrentPrice = (etf: unknown): boolean => {
  if (!validateETF(etf)) return false;

  const etfData = etf as any;
  return (
    typeof etfData.currentPrice === 'number' &&
    etfData.currentPrice >= ETF_VALIDATION_RULES.PRICE.min &&
    typeof etfData.priceChangePercentage === 'number' &&
    typeof etfData.isGaining === 'boolean'
  );
};

export const validateETFList = (etfs: unknown): boolean => {
  if (!Array.isArray(etfs)) return false;

  return etfs.every(validateETFWithCurrentPrice);
};
