import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '~/navigation/AppNavigator';
import { useTransactionStore } from '../store/TransactionStore';
import { TransactionStatusProps } from '../models/TransactionStatus';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface UseTransactionStatusProps extends TransactionStatusProps {}

export const useTransactionStatus = ({
  success,
  message,
  onReset,
}: UseTransactionStatusProps) => {
  console.log('[useTransactionStatus] Hook initialized with:', { success, message });
  
  const navigation = useNavigation<NavigationProp>();
  const { clearTransaction } = useTransactionStore();

  const iconName = success ? 'check-circle' : 'error';
  const iconColor = success ? 'green.500' : 'red.500';
  const textColor = success ? 'green.600' : 'red.600';
  const primaryButtonText = success ? 'Nouvelle transaction' : 'Réessayer';

  console.log('[useTransactionStatus] UI properties computed:', {
    iconName,
    iconColor,
    textColor,
    primaryButtonText,
  });

  const handleNewTransaction = () => {
    console.log('[useTransactionStatus] New transaction button pressed');
    clearTransaction();
    onReset?.();
    console.log('[useTransactionStatus] Transaction cleared and reset called');
  };

  const handleBackToDashboard = () => {
    console.log('[useTransactionStatus] Back to dashboard button pressed');
    clearTransaction();
    onReset?.();
    navigation.navigate('InvestmentDashboard');
    console.log('[useTransactionStatus] Navigated to InvestmentDashboard');
  };

  return {
    iconName,
    iconColor,
    textColor,
    primaryButtonText,
    message,
    handleNewTransaction,
    handleBackToDashboard,
  };
};
