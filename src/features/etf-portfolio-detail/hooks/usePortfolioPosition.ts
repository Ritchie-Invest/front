import { useState, useEffect } from 'react';
import { portfolioService } from '~/features/etf-portfolio/service/portfolioService';
import { PortfolioPositionsServiceAdapter } from '../adapters/PortfolioPositionsServiceAdapter';
import { DateRangeType } from '~/components/molecules/types/dateRange';
import { PortfolioHistoryResponse, PortfolioPosition } from '../models/PortfolioPosition';
import { PortfolioPositionsDataService } from '../contracts/portfolio-position.contract';

export const usePortfolioPosition = (
  id: string,
  dataService: PortfolioPositionsDataService = new PortfolioPositionsServiceAdapter(),
) => {
  const [position, setPosition] = useState<PortfolioPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosition = async () => {
    try {
      setLoading(true);
      setError(null);
      const history = await dataService.getPortfolioPositions(DateRangeType.OneMonth);
      const found =
        (history as PortfolioHistoryResponse).positions.find((p) => p.id === id) ?? null;
      setPosition(found);
    } catch (err) {
      setError('Failed to fetch portfolio position');
      console.error('Error fetching portfolio position:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPosition();
    }
  }, [id]);

  return {
    position,
    loading,
    error,
    refetch: fetchPosition,
  };
};
