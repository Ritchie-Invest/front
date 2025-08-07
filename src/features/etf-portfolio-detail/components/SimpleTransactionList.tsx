import React from 'react';
import { HStack, Text, VStack, Box } from 'native-base';
import { Pressable } from 'react-native';
import { useTransactions, getTypeColor, getTypeSymbol } from '../hooks/useTransaction';
import { Transaction } from '../models/transaction';
import { formatCurrency } from '~/utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';
import { ListItem } from '~/components/molecules/components/ListItem';

interface SimpleTransactionListProps {
  onTransactionPress?: (transaction: Transaction) => void;
}

export const SimpleTransactionList: React.FC<SimpleTransactionListProps> = ({
  onTransactionPress,
}) => {
  const { transactions, loading, error } = useTransactions();

  if (error) {
    return (
      <VStack alignItems="center" py={8}>
        <Text fontSize="lg" color="red.500">
          Erreur: {error}
        </Text>
      </VStack>
    );
  }

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" py={8}>
        <Text fontSize="lg" color="gray.400">
          Chargement...
        </Text>
      </Box>
    );
  }

  if (transactions.length === 0) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" py={8}>
        <Text fontSize="lg" color="gray.500" textAlign="center">
          Aucune transaction disponible
        </Text>
      </Box>
    );
  }

  return (
    <VStack space={0} flex={1}>
      <Text fontSize="xl" fontWeight="bold" color="gray.800" mb={4}>
        Historique des transactions
      </Text>

      {transactions.map((transaction, index) => (
        <ListItem
          key={`transaction-${transaction.id || index}`}
          onPress={() => onTransactionPress?.(transaction)}
          left={
            <VStack space={1}>
              <Text fontSize="md" fontWeight="semibold" color="gray.800">
                {transaction.assetName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {formatDate(transaction.date)}
              </Text>
            </VStack>
          }
          right={
            <HStack alignItems="center" space={2} justifyContent="flex-end">
              <VStack alignItems="flex-end" space={1}>
                <Text fontSize="sm" color="gray.600">
                  {transaction.type === 'BUY' ? 'Achat' : 'Vente'}
                </Text>
                <Text fontSize="lg" fontWeight="bold" color={getTypeColor(transaction.type)}>
                  {getTypeSymbol(transaction.type)}
                  {formatCurrency(transaction.value)}
                </Text>
              </VStack>
            </HStack>
          }
        />
      ))}
    </VStack>
  );
};
