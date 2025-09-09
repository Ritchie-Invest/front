import React from 'react';
import { Box, Center, HStack, Text, VStack } from '@gluestack-ui/themed';
import { colors, paddings, margins, borderRadius, typography } from '~/lib/theme/theme';
import { List } from '~/components/organisms/components/list';
import { useTransactions, getTypeColor, getTypeSymbol } from '../hooks/useTransaction';
import { Transaction } from '~/features/etf/models/Transaction';
import { formatCurrency } from '~/utils/formatCurrency';
import { formatDate } from '~/utils/formatDate';
import { TransactionType } from '~/features/etf/types/TransactionType';
interface TransactionListProps {
  onTransactionPress?: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ onTransactionPress }) => {
  const { transactions, loading, error } = useTransactions();

  if (error) {
    return (
      <VStack alignItems="center" py={paddings.paddingLarge}>
        <Text fontSize={typography.heading3Size} color={colors.errorColor}>
          Erreur: {error}
        </Text>
      </VStack>
    );
  }

  if (transactions.length < 1) {
    return (
      <Box
        bg={colors.mainBackgroundColor}
        p={paddings.paddingVerySmall}
        rounded={borderRadius.borderRadiusLarge}
        shadowOffset={{ width: 0, height: 1 }}
        shadowOpacity={0.1}
        shadowRadius={2}
        elevation={1}
        mb={margins.marginVerySmall}
        height={240}
      >
        <Center flex={1}>
          <Text color={colors.primaryTextColor} textAlign="center">
            Vous n'avez pas encore effectué de transactions ! Essayez dès maintenant d'investir 🚀
          </Text>
        </Center>
      </Box>
    );
  }

  return (
    <List
      data={transactions}
      loading={loading}
      title="Historique des transactions"
      renderLeft={(transaction: any) => (
        <VStack space="xs">
          <Text fontSize={typography.bodyLargeSize} fontWeight="semibold" color={colors.DarkGrey}>
            {transaction.etf?.ticker ?? transaction.etfTicker ?? '-'}
          </Text>
          <Text fontSize={typography.bodySmallSize} color={colors.GreyL30}>
            {formatDate(transaction.date ?? transaction.createdAt)}
          </Text>
        </VStack>
      )}
      renderRight={(transaction: any) => (
        <HStack alignItems="center" space="xs" justifyContent="flex-end">
          <VStack alignItems="flex-end" space="xs">
            <Text fontSize={typography.bodySmallSize} color={colors.Grey}>
              {transaction.type === TransactionType.Buy ? 'Achat' : 'Vente'}
            </Text>
            <Text
              fontSize={typography.heading3Size}
              fontWeight="bold"
              color={getTypeColor(transaction.type)}
            >
              {getTypeSymbol(transaction.type)}
              {formatCurrency(transaction.amount)}
            </Text>
            <Text fontSize={typography.bodySmallSize} color={colors.Grey}>
              {transaction.shares} parts
            </Text>
          </VStack>
        </HStack>
      )}
      onItemPress={onTransactionPress}
    />
  );
};
