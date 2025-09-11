import React from 'react';
import { Box, VStack, HStack, Text } from '@gluestack-ui/themed';
import { useTransactionForm } from '../hooks/useTransaction';
import { InputField } from '~/components/atoms/InputField';
import { Button } from '~/components/atoms/Button';
import { colors, spacing, typography } from '~/lib/theme/theme';

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
      <VStack
        space={spacing.spacingLargeFallback}
        mt={200}
        height={400}
        justifyContent="space-between"
      >
        <Box flex={1} justifyContent="space-between">
          <HStack alignItems="center" justifyContent="center" space={spacing.spacingMediumFallback}>
            <Box width="15%">
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
            <Text textAlign="center" color={colors.GreyL30} fontSize={typography.bodySize}>
              {shares} parts
            </Text>
          )}
          <Button onPress={handleSubmit} variant={finalVariant} isLoading={loading}>
            {buttonText}
          </Button>
        </Box>
      </VStack>
    );
  }
};
