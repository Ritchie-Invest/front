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
} as const;

export const validateETFId = (etfId: unknown): etfId is string => {
  return typeof etfId === 'string' && etfId.length > 0;
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
