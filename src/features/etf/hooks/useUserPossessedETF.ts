import { useState, useEffect, useRef } from 'react';
import { useSelectedETF, useSetSelectedETF } from '~/features/etf/store/ETFStore';
import { useRoute } from '@react-navigation/native';
import { UserPossessedETFServiceAdapter } from '../adapters/UserPossessedETFServiceAdapter';

export const useUserPossessedETF = () => {
  const selectedETF = useSelectedETF();
  const setSelectedETF = useSetSelectedETF();
  const route = useRoute();

  const [shares, setShares] = useState<number | undefined>();
  const [amount, setAmount] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const hasUpdatedStore = useRef(false);

  useEffect(() => {
    hasUpdatedStore.current = false;
  }, [selectedETF?.id]);

  useEffect(() => {
    if (route.name === 'ETFTransaction') {
      if (selectedETF) {
        setShares(selectedETF.userShares);
        setAmount(selectedETF.userAmount);
      }
    } else {
      setLoading(true);
      const adapter = new UserPossessedETFServiceAdapter();
      if (selectedETF && selectedETF.ticker && selectedETF.id) {
        adapter
          .getUserPossessedETF(selectedETF.id)
          .then((data) => {
            if (data && data.length > 0) {
              const possessed = data[0];
              setShares(possessed.shares);
              setAmount(possessed.amount);

              if (!hasUpdatedStore.current) {
                setSelectedETF({
                  ...selectedETF,
                  id: selectedETF.id,
                  ticker: selectedETF.ticker,
                  userShares: possessed.shares,
                  userAmount: possessed.amount,
                });
                hasUpdatedStore.current = true;
              }
            } else {
              console.warn('No possessed ETF data received for tickerId:', selectedETF.id);
              setShares(0);
              setAmount(0);

              if (!hasUpdatedStore.current) {
                setSelectedETF({
                  ...selectedETF,
                  id: selectedETF.id,
                  ticker: selectedETF.ticker,
                  userShares: 0,
                  userAmount: 0,
                });
                hasUpdatedStore.current = true;
              }
            }
            console.log('Fetched possessed ETF data:', data); // Debug log
            setLoading(false);
          })
          .catch((err) => {
            console.error('Error fetching possessed ETF data:', err);
            setError(err);
            setLoading(false);
          });
      }
    }
  }, [route.name, selectedETF]);

  return {
    shares,
    amount,
    loading,
    error,
  };
};
