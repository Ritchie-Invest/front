import React from 'react';
import { Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { MainStackParamList } from '../../../navigation/AppNavigator';
import { Box, Text, HStack } from 'native-base';
import { formatCurrency } from '../../../utils/formatCurrency';

interface PortfolioBalanceProps {
  balance: number;
  totalValue: number;
  loading?: boolean;
  onItemPress?: (item: any) => void;
}

export const PortfolioBalance = ({
  balance,
  totalValue,
  loading = false,
}: PortfolioBalanceProps) => {
  const navigation = useNavigation<StackNavigationProp<MainStackParamList, 'TransactionHistory'>>();
  if (loading) {
    return (
      <Box alignItems="center" py={6}>
        <Text fontSize="xl" color="gray.400">
          Chargement...
        </Text>
      </Box>
    );
  }

  return (
    <Pressable onPress={() => navigation.navigate('TransactionHistory')}>
      <Box alignItems="center" py={6}>
        <Text fontSize="3xl" fontWeight="bold" color="blue.600" mb={2}>
          {formatCurrency(totalValue)}
        </Text>
        <Text fontSize="lg" color="gray.600">
          Valeur totale du portfolio
        </Text>
        <HStack space={4} mt={4}>
          <Box alignItems="center">
            <Text fontSize="md" color="gray.500">
              Liquidités
            </Text>
            <Text fontSize="lg" fontWeight="semibold" color="green.600">
              {formatCurrency(balance)}
            </Text>
          </Box>
          <Box alignItems="center">
            <Text fontSize="md" color="gray.500">
              Investissements
            </Text>
            <Text fontSize="lg" fontWeight="semibold" color="blue.600">
              {formatCurrency(totalValue - balance)}
            </Text>
          </Box>
        </HStack>
      </Box>
    </Pressable>
  );
};
