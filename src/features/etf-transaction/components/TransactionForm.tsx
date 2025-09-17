import React from 'react';
import { Box, VStack, HStack, Text, Center } from '@gluestack-ui/themed';
import { useTransactionForm } from '../hooks/useTransaction';
import { InputField } from '~/components/atoms/InputField';
import { Button } from '~/components/atoms/Button';
import { colors, spacing, typography } from '~/lib/theme/theme';
import { usePortfolio } from '~/features/etf-portfolio/hooks/usePortfolio';

export const TransactionForm: React.FC = () => {
  const {
    amount,
    setAmount,
    handleSubmit,
    buttonText,
    finalVariant,
    selectedETF,
    loading,
    shares,
  } = useTransactionForm();

  const { portfolio } = usePortfolio();
  const cash = portfolio?.cash;

  if (!selectedETF) {
    return (
      <Box mt="$6" bg={colors.errorBackgroundColor}>
        <Text color={colors.errorColor} textAlign="center">
          Aucun ETF sélectionné
        </Text>
      </Box>
    );
  } else {
    return (
      <VStack space={spacing.spacingLargeFallback} justifyContent="space-between" flex={1}>
        <Center flex={1} gap={spacing.spacingMedium}>
          <HStack alignItems="center" justifyContent="center" space={spacing.spacingMediumFallback}>
            <Box minWidth="25%" width="auto" flexShrink={1}>
              <InputField
                placeholder=""
                value={amount ?? ''}
                onChange={setAmount}
                variant="underlined"
                type="numeric"
                accessibilityLabel="Montant en euros"
              />
            </Box>
            <Text fontSize={typography.transactionInputSize} fontWeight="bold" color="black">
              €
            </Text>
          </HStack>
          {amount && amount > 0 && (
            <Text textAlign="center" color={colors.mutedTextColor} fontSize={typography.bodySize}>
              {shares.toFixed(2)} parts
            </Text>
          )}
          {cash !== undefined && (
            <Text textAlign="center" color={colors.mutedTextColor} fontSize={typography.bodySize}>
              Solde du portefeuille : <Text color={colors.successColor}>{cash.toFixed(2)} €</Text>
            </Text>
          )}
        </Center>

        <Button onPress={handleSubmit} variant={finalVariant} isLoading={loading}>
          {buttonText}
        </Button>
      </VStack>
    );
  }
};
