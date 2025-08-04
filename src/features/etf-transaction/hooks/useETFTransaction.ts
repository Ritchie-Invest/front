import { useState, useEffect } from 'react';
import { usePortfolioPosition } from '~/features/etf-portfolio/hooks/usePortfolioPosition';
import { ETFPriceHistoryServiceAdapter } from '~/features/etf-detail/adapters/ETFPriceHistoryServiceAdapter';
import { ETFWithPriceHistory } from '~/features/etf-detail';

interface ETFTransactionData {
  ticker: string;
  name: string;
  currentPrice: number;
  ownedValue: number;
  ownedQuantity: number;
}

export const useETFTransaction = (etfId: string) => {
  const [etfData, setETFData] = useState<ETFWithPriceHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    position: portfolioPosition,
    loading: positionLoading,
    error: positionError,
  } = usePortfolioPosition(etfId);

  const fetchETFData = async () => {
    try {
      setLoading(true);
      setError(null);
      const service = new ETFPriceHistoryServiceAdapter();
      const data = await service.getETFWithPriceHistory(etfId, '1M');
      setETFData(data);
    } catch (err) {
      setError('Failed to fetch ETF data');
      console.error('Error fetching ETF data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (etfId) {
      fetchETFData();
    }
  }, [etfId]);

  const transactionData: ETFTransactionData | null = etfData
    ? {
        ticker: etfData.ticker,
        name: etfData.name,
        currentPrice: etfData.currentPrice,
        ownedValue: portfolioPosition?.totalValue || 0,
        ownedQuantity: portfolioPosition?.quantity || 0,
      }
    : null;

  return {
    data: transactionData,
    loading: loading || positionLoading,
    error: error || positionError,
    refetch: fetchETFData,
  };
};
