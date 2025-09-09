import { useState, useEffect } from 'react';
import { Portfolio } from '../models/portfolio';
import { PortfolioDataService } from '../contracts/portfolio.contract';
import { PortfolioServiceAdapter } from '../adapters/portfolioServiceAdapter';

export const usePortfolio = (dataService: PortfolioDataService = new PortfolioServiceAdapter()) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);

      const portfolioData = await dataService.getPortfolio();
      setPortfolio(portfolioData);
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
    loading,
    error,
    refetch: fetchPortfolioData,
  };
};
