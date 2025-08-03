import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../../navigation/AppNavigator';
import { ETFWithPriceHistory } from '../model/etfPriceData';
import { TransactionType } from '../../etf-trading/types/Transaction';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface UseBuyAndSellButtonsProps {
  etfData: ETFWithPriceHistory | null;
}

export const useBuyAndSellButtons = ({ etfData }: UseBuyAndSellButtonsProps) => {
  const navigation = useNavigation<NavigationProp>();

  const handleBuyPress = () => {
    if (!etfData) return;

    navigation.navigate('ETFTrading', {
      etfID: etfData.etfID,
      action: TransactionType.Buy,
      etfData: {
        ticker: etfData.ticker,
        name: etfData.name,
        currentPrice: etfData.currentPrice,
      },
    });
  };

  const handleSellPress = () => {
    if (!etfData) return;

    navigation.navigate('ETFTrading', {
      etfID: etfData.etfID,
      action: TransactionType.Sell,
      etfData: {
        ticker: etfData.ticker,
        name: etfData.name,
        currentPrice: etfData.currentPrice,
      },
    });
  };

  const isDisabled = !etfData;

  return {
    handleBuyPress,
    handleSellPress,
    isDisabled,
  };
};
