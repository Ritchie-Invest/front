import { useState, useEffect } from 'react';
import { PortfolioDataService } from '~/features/etf-portfolio/contracts/portfolio.contract';
import { PortfolioServiceAdapter } from '~/features/etf-portfolio/adapters/portfolioServiceAdapter';
import { PortfolioPosition } from '~/features/etf-portfolio/models/portfolio';

export interface ETFHeaderData {
  ticker: string;
  currentPrice: number;
  ownedValue: number;
  ownedQuantity: number;
}

export const useETFHeader = (
  etfId: string,
  ticker: string,
  currentValue: number,
  portfolioService: PortfolioDataService = new PortfolioServiceAdapter(),
) => {
  const [data, setData] = useState<ETFHeaderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchETFHeaderData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Convertir string ID en number pour le service portfolio
      const numericEtfId = parseInt(etfId, 10);

      if (isNaN(numericEtfId)) {
        throw new Error('Invalid ETF ID format');
      }

      // Récupérer la position du portfolio pour cet ETF
      const portfolioPosition = await portfolioService.getPortfolioPositionByETF(numericEtfId);

      // Construire les données de l'header
      const headerData: ETFHeaderData = {
        ticker,
        currentPrice: currentValue,
        ownedValue: portfolioPosition ? portfolioPosition.totalValue : 0,
        ownedQuantity: portfolioPosition ? portfolioPosition.quantity : 0,
      };

      setData(headerData);
    } catch (err) {
      setError('Failed to fetch ETF header data');
      console.error('Error fetching ETF header data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchETFHeaderData();
  }, [etfId, ticker, currentValue]);

  return {
    data,
    loading,
    error,
    refetch: fetchETFHeaderData,
  };
};
