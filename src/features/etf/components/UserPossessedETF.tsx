import React, { memo } from 'react';
import { VStack, HStack, Text, Spinner, Center } from '@gluestack-ui/themed';
import { colors, margins, paddings, spacing, typography } from '~/lib/theme/theme';
import { useUserPossessedETF } from '../hooks/useUserPossessedETF';

export const UserPossessedETFValues: React.FC = memo(() => {
  const { shares, amount, loading, error } = useUserPossessedETF();

  const isLoading = loading;

  if (isLoading) {
    return (
      <Center py={paddings.paddingRegular}>
        <Spinner />
      </Center>
    );
  }

  if (error || shares === undefined || shares === null || amount === undefined || amount === null) {
    return (
      <Center py={paddings.paddingRegular}>
        <Text color={colors.errorColor}>
          Erreur lors du chargement de la valeur possédée de l'ETF.
          {error && (
            <Text color={colors.errorColor} fontSize={typography.bodySize}>
              Détails: {error.message} valeur shares : {shares} valeur amount : {amount}
            </Text>
          )}
        </Text>
      </Center>
    );
  }

  if (shares === 0 || amount === 0) {
    return (
      <HStack width="100%" justifyContent="space-between" alignItems="flex-start">
        <Text
          fontSize={typography.bodySize}
          fontWeight={typography.fontWeightRegular}
          color={colors.Grey}
        >
          Vous ne possédez pas encore cette ETF.
        </Text>
      </HStack>
    );
  }
  return (
    <HStack width="100%" justifyContent="space-between" alignItems="flex-start">
      <Text
        fontSize={typography.bodySize}
        fontWeight={typography.fontWeightRegular}
        color={colors.Grey}
      >
        Possédé: {amount} €
      </Text>
      <Text
        fontSize={typography.bodySize}
        fontWeight={typography.fontWeightRegular}
        color={colors.Grey}
      >
        {shares.toFixed(3)} parts
      </Text>
    </HStack>
  );
});
