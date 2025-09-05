import { useState, useEffect } from 'react';
import { PortfolioPosition } from '../models/portfolio';
import { portfolioService } from '../service/portfolioService';
import { PortfolioDataService } from '../contracts/portfolio.contract';

export const usePortfolioPosition = (
  id: string,
  dataService: PortfolioDataService = portfolioService,
) => {
  const [position, setPosition] = useState<PortfolioPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosition = async () => {
    try {
      setLoading(true);
      setError(null);
      const positionData = await dataService.getPortfolioPositionByETF(id);
      setPosition(positionData);
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
