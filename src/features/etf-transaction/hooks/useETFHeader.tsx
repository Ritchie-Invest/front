import { useState, useEffect } from 'react';
import { PossessedValueService } from '../services/PossessedValueService';
import { PossessedValueRequest } from '../models/PosessedValueRequest';

export interface ETFHeaderData {
  ticker: string;
  currentPrice: number;
  ownedValue: number;
}

export const useETFHeader = (etfId: string, ticker: string, currentValue: number) => {
  const [data, setData] = useState<ETFHeaderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchETFHeaderData = async () => {
    try {
      setLoading(true);
      setError(null);

      const numericEtfId = parseInt(etfId, 10);

      if (isNaN(numericEtfId)) {
        throw new Error('Invalid ETF ID format');
      }

      // Utiliser le PossessedValueService pour récupérer la valeur possédée
      const possessedValueRequest: PossessedValueRequest = {
        userId: 'current-user', // À récupérer depuis le contexte utilisateur si disponible
        etfId: etfId,
      };

      const possessedValueResponse = PossessedValueService.getPossessedValue(possessedValueRequest);

      // Construire les données de l'header
      const headerData: ETFHeaderData = {
        ticker,
        currentPrice: currentValue,
        ownedValue: possessedValueResponse.value,
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
