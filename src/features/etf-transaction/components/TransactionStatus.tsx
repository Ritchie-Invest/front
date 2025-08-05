import React from 'react';
import { VStack, HStack, Icon, Text } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { Button } from '~/components/atoms/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '~/navigation/AppNavigator';
import { useTransactionStore } from '../store/TransactionStore';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

interface TransactionStatusProps {
  success: boolean;
  message: string;
}

export const TransactionStatus: React.FC<TransactionStatusProps> = ({ success, message }) => {
  const navigation = useNavigation<NavigationProp>();
  const { clearTransaction } = useTransactionStore();

  const handleNewTransaction = () => {
    clearTransaction();
  };

  const handleBackToDashboard = () => {
    clearTransaction();
    navigation.navigate('InvestmentDashboard');
  };

  return (
    <VStack space={6} alignItems="center" width="100%">
      <Icon
        as={MaterialIcons}
        name={success ? 'check-circle' : 'error'}
        size="6xl"
        color={success ? 'green.500' : 'red.500'}
      />
      <Text fontSize="md" textAlign="center" color={success ? 'green.600' : 'red.600'}>
        {message}
      </Text>
      <VStack space={3} width="100%">
        <Button variant="primary" width="100%" onPress={handleNewTransaction}>
          {success ? 'Nouvelle transaction' : 'Réessayer'}
        </Button>
        <Button variant="outline" width="100%" onPress={handleBackToDashboard}>
          Retour au dashboard
        </Button>
      </VStack>
    </VStack>
  );
};
