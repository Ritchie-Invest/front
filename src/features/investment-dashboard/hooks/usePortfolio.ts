import { useState, useEffect } from 'react';
import { Portfolio, PortfolioPosition } from '../models';
import { portfolioService } from '../services';

export const usePortfolio = () => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [positions, setPositions] = useState<PortfolioPosition[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [portfolioData, positionsData, totalValueData] = await Promise.all([
        portfolioService.getPortfolio(),
        portfolioService.getPortfolioPositions(),
        portfolioService.getTotalPortfolioValue(),
      ]);

      setPortfolio(portfolioData);
      setPositions(positionsData);
      setTotalValue(totalValueData);
    } catch (err) {
      setError('Failed to fetch portfolio data');
      console.error('Error fetching portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  return {
    portfolio,
    positions,
    totalValue,
    loading,
    error,
    refetch: fetchPortfolioData,
  };
};
