import React from 'react';
import { Box, Text, VStack } from '@gluestack-ui/themed';
import { PostTransactionApiResponse } from '~/features/etf/models/Transaction';
import { colors, spacing } from '~/lib/theme/theme';

type ResponseMessageProps = {
  response: PostTransactionApiResponse | null;
  error: string | null;
};

export const ResponseMessage: React.FC<ResponseMessageProps> = ({ response, error }) => {
  if (!response && !error) return null;

  const isSuccess = response !== null;

  return (
    <Box
      bg={isSuccess ? colors.successBackgroundColor : colors.errorBackgroundColor}
      p="$4"
      borderRadius="$md"
      mt="$4"
    >
      <VStack space="sm">
        <Text
          fontSize="$lg"
          fontWeight="$bold"
          color={isSuccess ? colors.successColor : colors.errorColor}
          textAlign="center"
        >
          {isSuccess ? '✅ Transaction réussie' : '❌ Erreur de transaction'}
        </Text>

        {isSuccess && response ? (
          <VStack space="xs">
            <Text color={colors.primaryTextColor}>💰 Solde: {response.cash.toFixed(2)} €</Text>
            <Text color={colors.primaryTextColor}>
              📈 Investissements: {response.investments.toFixed(2)} €
            </Text>
            <Text color={colors.primaryTextColor}>
              🏷️ Titres détenus: {response.tickerHoldings}
            </Text>
          </VStack>
        ) : (
          <Text color={colors.primaryTextColor} textAlign="center">
            {error}
          </Text>
        )}
      </VStack>
    </Box>
  );
};
