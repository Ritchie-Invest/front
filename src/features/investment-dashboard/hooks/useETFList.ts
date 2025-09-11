import { useState, useEffect } from 'react';
import { ETF } from '../../etf/models/ETF';
import { ETFListContract } from '../contracts/ETFListContract';
import { ETFListServiceAdapter } from '../adapters/ETFListServiceAdapter';
import { useNavigation } from '@react-navigation/native';
import { useSetSelectedETF } from '~/features/etf/store/ETFStore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '~/navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'InvestmentDashboard'>;

export const useETFList = (dataService: ETFListContract = new ETFListServiceAdapter()) => {
  const [etfs, setETFs] = useState<ETF[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchETFs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dataService.getAllETFs();
      setETFs(data);
    } catch (err) {
      setError('Failed to fetch ETFs');
      console.error('Error fetching ETFs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchETFs();
  }, []);

  const navigation = useNavigation<NavigationProp>();
  const setSelectedETF = useSetSelectedETF();

  const isGaining = (etf: ETF) => etf.variationDirection === 'UP';

  const handleETFPress = (etf: ETF) => {
    setSelectedETF({
      id: etf.id,
      ticker: etf.symbol,
      name: etf.name,
      currentPrice: etf.price,
    });

    navigation.navigate('ETFDetails', { id: etf.id });
  };

  return {
    etfs,
    loading,
    error,
    refetch: fetchETFs,
    isGaining,
    handleETFPress,
  };
};
