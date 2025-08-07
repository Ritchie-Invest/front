import React from 'react';
import { HStack, Text, VStack } from 'native-base';
import { List } from '~/components/organisms/components/list';
import { useTransactions, getTypeColor, getTypeSymbol } from '../hooks/useTransaction';
import { Transaction } from '../models/transaction';
import { formatCurrency } from '~/utils/formatCurrency';
import { formatDate } from '../../../utils/formatDate';

interface TransactionListProps {
  onTransactionPress?: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ onTransactionPress }) => {
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

  return (
    <List
      data={transactions}
      loading={loading}
      title="Historique des transactions"
      renderLeft={(transaction) => (
        <VStack space={1}>
          <Text fontSize="md" fontWeight="semibold" color="gray.800">
            {transaction.assetName}
          </Text>
          <Text fontSize="sm" color="gray.500">
            {formatDate(transaction.date)}
          </Text>
        </VStack>
      )}
      renderRight={(transaction) => (
        <>
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
        </>
      )}
      onItemPress={onTransactionPress}
    />
  );
};
